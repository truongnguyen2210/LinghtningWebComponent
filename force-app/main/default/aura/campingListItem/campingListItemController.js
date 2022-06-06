({
     // Load expenses from Salesforce
    doInit: function(component, event, helper) {
        // Create the action
        let action = component.get("c.getItems");
        // Add callback behavior for when response is received
        action.setCallback(this, function(response) {
            let state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.item", response.getReturnValue());
            }
            else {
                console.log("Failed with state: " + state);
            }
        });
        // Send action off to be executed
        $A.enqueueAction(action);
    },
    
	packItem : function(component, event, helper) {
        
        let inputpackItem = component.find("inputCheckbox");
        if(!inputpackItem.get("v.disabled")){
            component.set("v.item.Packed__c", true);
        }else{
            component.set("v.isDisabled", true);
        }
        
    }
})