todo:

update inventory_items
set Size = replace(Size,'Extra Small','XS')
where inventoryid 
in (select id from inventory.inventory where inventorytypeid = 8);


select * from inventory_items
where inventoryid 
in (select id from inventory.inventory where inventorytypeid = 7);

