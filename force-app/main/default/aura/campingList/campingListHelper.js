({
	createItem  : function(component, camping) {
        const action = component.get('c.saveItem');
		action.setParams({
			camping: camping
		});
		action.setCallback(this, function(response){
			let state = response.getState();
			if(state = "SUCCESS"){
                 let item = response.getReturnValue();
                 let items = component.get("v.items");
                    items.push(item);
                    component.set("v.newItem",{'sobjectType':'Camping_Item__c',
                        'Name': '',
                        'Quantity__c': 0,
                        'Price__c': 0,
                        'Packed__c': false});
                    component.set('v.items', items);
				 let toastEvent = $A.get("e.force:showToast");
                	toastEvent.setParams({
                    title: "SUCCESS!",
                    message: "the notification that the items value provider has changed",
                    duration: "3",
                    type: "success"
                });
                toastEvent.fire();
			}else if(state === "ERROR"){
				helper.showMessage('error', 'Failed when get list Lop: ' + state)
			}
		});
		$A.enqueueAction(action);
	}
})