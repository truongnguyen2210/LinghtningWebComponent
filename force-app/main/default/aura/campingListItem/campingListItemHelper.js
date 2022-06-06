({
	createItem : function(component, item) {
        let action = component.get("c.saveItem");
        action.setParams({
            "item": item
        });
        action.setCallback(this, function(response){
            let state = response.getState();
            if (state === "SUCCESS") {
                let items = component.get("v.item");
                items.push(response.getReturnValue());
                component.set("v.item", items);
            }
        });
        $A.enqueueAction(action);
    },
})