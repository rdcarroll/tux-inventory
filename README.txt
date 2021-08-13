todo:

update inventory_items
set Size = replace(Size,'Extra Small','XS')
where inventoryid 
in (select id from inventory.inventory where inventorytypeid = 8);


select * from inventory_items
where inventoryid 
in (select id from inventory.inventory where inventorytypeid = 7);


ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQCNf1jvrFzvMAHCPvnqSgCm7OEAy8fGVnl1OwqzglXfwyu5xNCsrEhh0Tilu78OudUY+iHmKtPxJgViAFbiOJ1XJXTSHeD3HORCfKlOp47HeNanl1yA2vF+2Li/LZqx8RG/aBhjnRK6GsTGyoJXIHY+lE3ZAQ63+0Iksuslvd3jD5gjrsnAeXmHbxXB5fAZ9lb4ha5RavsBzjQjCxCcleoTxYmDgnvUJ+XLBVUz2GGzyyzKBqNz+QC0Ec37dfSQq9VXvdV9Sy8CkOI0fHv4bn14OCAEU6wcTTWcRzLv1CWMeI1XXnJpe2aaelGQxfYN6ruOS8kvfQbtXiij1XLPK1i1 rsa-key-20210813