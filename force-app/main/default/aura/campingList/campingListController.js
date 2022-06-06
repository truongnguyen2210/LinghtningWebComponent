({
    doInit : function(component, event, helper) {
		const action = component.get('c.getItems');
		action.setCallback(this, function(response){
			let state = response.getState();
			if(state = "SUCCESS"){
				let items = response.getReturnValue();
				component.set('v.items', items);
			}else if(state === "ERROR"){
				helper.showMessage('error', 'Failed when get list Lop: ' + state)
			}
		});
		$A.enqueueAction(action);
	},
	clickCreateItem : function(component, event, helper) {
		let camping = component.get('v.newItem');
        let validCamping = component.find('campingForm').reduce(function (validSoFar, inputCmp) {
            // Displays error messages for invalid fields
            inputCmp.showHelpMessageIfInvalid();
            return validSoFar && inputCmp.get('v.validity').valid;
        }, true);
        // If we pass error checking, do some real work
        if(validCamping){
            // Create the new expense
            helper.createItem(component, camping);
        }
	}
})