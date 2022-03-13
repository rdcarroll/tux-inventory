
update inventory_items
set Size = replace(Size,'Extra Small','XS')
where inventoryid 
in (select id from inventory.inventory where inventorytypeid = 8);

The app is running on Digital Ocean
PM2 is the app running and keeping it awake
local MySQL
Self Signed Certificates



rick@ubuntu-node-mysql-angular:~/code/inventory$ git pull origin main