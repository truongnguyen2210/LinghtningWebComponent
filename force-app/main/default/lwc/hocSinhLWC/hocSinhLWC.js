/**
 * クラス名	: hocSinhLWC.js
 * クラス概要	: handle event ui
 * @created	: 2021/11/14 KSVC Truong Thanh Nguyen
 * @modified: 
 */
import {LightningElement, track, wire } from 'lwc';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

import getListLop from '@salesforce/apex/LWCHocSinhController.getListLop';
import searchHocSinh from '@salesforce/apex/LWCHocSinhController.searchHocSinh';
import deleteHocSinhById from '@salesforce/apex/LWCHocSinhController.deleteHocSinhById';
import deleteHocSinhByCheckBox from '@salesforce/apex/LWCHocSinhController.deleteHocSinhByCheckBox';

import HocSinh_OBJECT from '@salesforce/schema/Object_HocSinh__c';
import TenHocSinh_FIELD from '@salesforce/schema/Object_HocSinh__c.TenHocSinh__c';
import HoHocSinh_FIELD from '@salesforce/schema/Object_HocSinh__c.HoHocSinh__c';
import Lop_FIELD from '@salesforce/schema/Object_HocSinh__c.Lop__c';
import GioiTinh_FIELD from '@salesforce/schema/Object_HocSinh__c.GioiTinh__c';
import NgaySinh_FIELD from '@salesforce/schema/Object_HocSinh__c.NgaySinh__c';
import Diem1_FIELD from '@salesforce/schema/Object_HocSinh__c.Diem1__c';
import Diem2_FIELD from '@salesforce/schema/Object_HocSinh__c.Diem2__c';
import Diem3_FIELD from '@salesforce/schema/Object_HocSinh__c.Diem3__c';

export default class HocSinhLWC extends LightningElement {

    //get list lop
    @wire(getListLop) lop;

    //list hoc sinh result
    @track lstHocSinh = [];
    @track idHocSinh = "";

    //Object_HocSinh__c
    objectHocSinhApi = HocSinh_OBJECT;
    
    //Create field object hocsinh
    objHocSinh = {
        HoHocSinh__c : HoHocSinh_FIELD,
        TenHocSinh__c: TenHocSinh_FIELD,
        NgaySinh__c: NgaySinh_FIELD,
        GioiTinh__c: GioiTinh_FIELD,
        Lop__c: Lop_FIELD,
        Diem1__c: Diem1_FIELD,
        Diem2__c: Diem2_FIELD,
        Diem3__c: Diem3_FIELD
    }

    /**
     * 関数名	 : showMessage
     * @param	: type, message
     * @return	: message
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */
    showMessage(type, title, message){
        this.dispatchEvent(
            new ShowToastEvent({
                title: title,
                message: message,
                variant: type,
            }),
        );
    }

    //display loading
    isLoading = false;

    //control display modal
    displayModalInsert = false;
    displayTableLoadData = false;
    displayModalUpdate = false;
    displayModalDetail = false;

    openModalInsert(event) {  
        this.displayModalInsert = true;
    }
    exitsModalInsert(event) {
        this.displayModalInsert = false;
    }

    exitsModalUpdate(event){
        this.displayModalUpdate = false;
    }

    exitsModalDetail(event){
        this.displayModalDetail = false;
    }

    /**
     * 関数名	 : searchHocSinhAction
     * @param	: なし
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */
    searchHocSinhAction(){
        this.isLoading = true;
        const dataSearch = this.getDataSearch();
        const keySearch = {
            TenHocSinh__c: dataSearch.nameStudent,
            Lop__c: dataSearch.classStudent,
            NgaySinh__c: dataSearch.dateStart,
        }

        searchHocSinh({
            keySearch: keySearch,
            dateEnd: dataSearch.dateEnd,
            sortByName: dataSearch.sortByName
        })
        .then(result=>{
            this.lstHocSinh = result;
            this.displayTableLoadData = true;
            this.colorStatus();
            this.isLoading = false;
            if(this.lstHocSinh.length == 0){
                this.showMessage('danger', 'Message', 'Không có kết quả trả về!');
                this.displayTableLoadData = false;
            }
        })
        .catch(error=>{
           this.showMessage('danger', 'Message', error.body.message);
           this.displayTableLoadData = false;
           this.isLoading = false;
        })
    }

    /**
     * 関数名	 : colorStatus
     * @param	: なし
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */
    colorStatus(){
        const tableHocSinh = this.template.querySelector('.tableLoadDataStudent');
        const rows = this.template.querySelectorAll('tr');
        if(rows != undefined){
            for (let i = 1; i < rows.length; i++) {   
                if (tableHocSinh.rows[i].cells[10].innerText == 'Rớt') { 
                    rows[i].classList.add('studentFall');
                }
            }
        }
    }

    /**
     * 関数名	 : getDataSearch
     * @param	: なし
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */
    getDataSearch(){
        let objHocSinh = {
            nameStudent: this.template.querySelector('.txtNameStudent').value,
            classStudent: this.template.querySelector('.sloIdClass').value,
            dateStart: this.template.querySelector('.dtDateStart').value,
            dateEnd: this.template.querySelector('.dtDateEnd').value,
            sortByName: this.template.querySelector('.chbSortByName').checked
        }
        return objHocSinh;
    }

    /**
     * 関数名	 : handleHocSinhCreated
     * @param	: なし
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */
    handleHocSinhCreated(){
        this.showMessage('success', 'Message', 'Đã thêm thành công!');
        this.exitsModalInsert();
        this.searchHocSinhAction();
    }

    /**
     * 関数名	 : updateHocSinhAction
     * @param	:  event
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */
    updateHocSinhAction(event){
        this.idHocSinh = event.target.title;
        this.displayModalUpdate = true;
    }

    /**
     * 関数名	 : handleHocSinhUpdate
     * @param	: なし
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */
    handleHocSinhUpdate(){
        this.showMessage('success', 'Message', 'Cập Nhật thành công!');
        this.exitsModalUpdate();
        this.searchHocSinhAction();
        this.colorStatus();
    }

    /**
     * 関数名	 : detailHocSinhAction
     * @param	: event
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */
    detailHocSinhAction(event){
        this.idHocSinh = event.target.title;
        this.displayModalDetail = true;
    }

    /**
     * 関数名	 : deleteHocSinhWhenViewDetail
     * @param	: event
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */
    deleteHocSinhWhenViewDetail(){
        if(confirm("Bạn có muốn xóa không")){
            deleteHocSinhById({idHocSinh: this.idHocSinh})
            .then(result=>{
                if(result == true){
                    this.showMessage('success', 'Message', 'Đã xóa thành công!');
                    this.displayModalDetail = false;
                    this.searchHocSinhAction();
                }
            })
            .catch(error=>{
                console.log(error);
                this.showMessage('danger', 'Message', error.body.message);
            })
        }
    }

    /**
     * 関数名	 : deleteHocSinhAction
     * @param	: event
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */ 
    deleteHocSinhAction(event){
        if(confirm("Bạn có muốn xóa không")){
            const idHocSinh = event.target.title;
            deleteHocSinhById({idHocSinh: idHocSinh})
            .then(result=>{
                if(result == true){
                    this.showMessage('success', 'Message', 'Đã xóa thành công!');
                    this.searchHocSinhAction();
                }
            })
            .catch(error=>{
                console.log(error);
                this.showMessage('danger', 'Message', error.body.message);
            })
        }
    }

    /**
     * 関数名	 : checkAllAction
     * @param	: event
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */ 
    checkAllAction(event){
        const lstCheckbox = this.template.querySelectorAll(".cbHocSinhItem");
        const isCheckAll = event.target.checked;
        for (let index = 0; index < lstCheckbox.length; index++) {
            lstCheckbox[index].checked = isCheckAll;
        }
    }

    /**
     * 関数名	 : checkItemAction
     * @param	: event
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */ 
    checkItemAction(event){
        const lstCheckbox = this.template.querySelectorAll(".cbHocSinhItem");
        const checkAll = this.template.querySelector(".checkAllHocSinh");
        let isChecked = true;
        for (let index = 0; index < lstCheckbox.length; index++) {
            if(lstCheckbox[index].checked == false){
                isChecked = false;
            }
        }
        checkAll.checked = isChecked;
    }

    /**
     * 関数名	 : deleteHocSinhByCheckboxAction
     * @param	: event
     * @return	: なし
     * @created	: 2021/11/17 KSVC Truong Thanh Nguyen
     * @modified: 
    */ 
    deleteHocSinhByCheckboxAction(event){
        const lstCheckbox = this.template.querySelectorAll(".cbHocSinhItem");
        const lstBtnDelete = this.template.querySelectorAll(".btnDeleteHocSinh");
        const arrIdHocSinh = [];
        for(let i = 0; i < lstCheckbox.length; i++){
            if(lstCheckbox[i].checked == true){
                arrIdHocSinh.push(lstBtnDelete[i].title);
            }
        }
        if(arrIdHocSinh.length > 0){
            if(confirm("Bạn có muốn xóa không!")){
                const idDelete = arrIdHocSinh.toString();
                deleteHocSinhByCheckBox({idDelete: idDelete})
                .then(result=>{
                    if(result == true){
                        this.showMessage('success', 'Message', 'Đã xóa thành công!');
                        this.searchHocSinhAction();
                    }
                })
                .catch(error=>{
                    this.showMessage('danger', 'Message', error.body.message);
                })
            }
        }else{
            this.showMessage('danger', 'Message', 'Bạn chưa chọn học sinh để xóa!');
        }
    }
    
}