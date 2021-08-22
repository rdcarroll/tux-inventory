const fastcsv = require('fast-csv');
const path = require('path');
const fs = require('fs');

const db = require("../Models");

const customers = db.customers;
const customer_sizes = db.customer_sizes;
const inventory = db.inventory;
const inventory_items = db.inventory_items;

function isEmpty(o){
  var _isempty = true;
  Object.keys(o).forEach(function(key) {
    if (o[key]) _isempty = false;
  });
  return _isempty;
}

exports.importcustomers = async (req, res) => {
  try {
    let jsondata = [];
    let sizedata = [];
    fs.createReadStream(path.resolve(__dirname, '\..\\assets', 'customers.csv'))
    .pipe(fastcsv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', async row => {
      if(!row["Last Name"] && !row["First Name"]) return;
      row["Phone Number"] = row["Phone Number"].replace('\'','');

      jsondata.push(row);
      //console.log(row);

      let _customers = await customers.findAll({where: {
        //LastName:'Carroll'
        LastName: row["Last Name"], 
        Phone:row["Phone Number"], 
        Email:row["Email Address"]
      }});
      let _cust = null;
      if(_customers.length>0){
        //update
        let cust = _customers[0];
        let update = {
          FirstName:row["First Name"],
          //LastName:row["Last Name"],
          //Email:row["Email Address"],
          //Phone:row["Phone Number"],
          Address:row["Street Address 1"],
          City:row.City,
          State:row.State,
          Zipcode:row["Postal Code"],
          Birthday:row.Birthdate,
        }
        _cust = await customers.update(update, {
          where: {
            ID: cust.ID
          }
        });

      }
      else{
        //create
        _cust = await customers.create({
          FirstName:row["First Name"],
          LastName:row["Last Name"],
          Email:row["Email Address"],
          Phone:row["Phone Number"],
          Address:row["Street Address 1"],
          City:row.City,
          State:row.State,
          Zipcode:row["Postal Code"],
          Birthday:row.Birthdate,
        });
      }

      
      let nu = await customers.findAll({where: {
        LastName: row["Last Name"], 
        Phone:row["Phone Number"], 
        Email:row["Email Address"]
      }});

      //search for sizes
        let sizes = {
          Coat:"",
          Shirt:"",
          Pants:"",
          Waist:"",
          Vest:"",
          Tie:"",
          Shoe:"",
          Height:"",
          Chest:"",
          Neck:"",
          Sleeve:""
        }
      if(row.Memo){
        let ms = row.Memo;
        let coatstyle = /Coat Style:(.*)\n/.test(ms) ? /Coat Style:(.*)\n/.exec(ms)[1] : "";
        let color = /Color:(.*)\n/.test(ms) ? /Color:(.*)\n/.exec (ms)[1] : "";
        let pants = /Pants:(.*)\n/.test(ms) ? /Pants:(.*)\n/.exec (ms)[1] : "";
        let shirt = /Shirt:(.*)\n/.test(ms) ? /Shirt:(.*)\n/.exec (ms)[1] : "";
        let tie = /Tie:(.*)\n/.test(ms) ? /Tie:(.*)\n/.exec (ms)[1] : "";
        let vest = /Vest:(.*)\n/.test(ms) ? /Vest:(.*)\n/.exec (ms)[1] : "";
        let shoes = /Shoes:(.*)\n/.test(ms) ? /Shoes:(.*)\n/.exec (ms)[1] : "";
        
        let height = /Height:(.*)\n/.test(ms) ? /Height:(.*)\n/.exec (ms)[1] : "";
        let chest = /Chest:(.*)\n/.test(ms) ? /Chest:(.*)\n/.exec (ms)[1] : "";
        let outarm = /Out Arm:(.*)\n/.test(ms) ? /Out Arm:(.*)\n/.exec (ms)[1] : "";
        let coatsize = /Coat\s?Size:(.*)\n/.test(ms) ? /Coat\s?Size:(.*)\n/.exec (ms)[1] : "";
        let waist = /Waist:(.*)\n/.test(ms) ? /Waist:(.*)\n/.exec (ms)[1] : "";
        let outseam = /Out Seam:(.*)\n/.test(ms) ? /Out Seam:(.*)\n/.exec (ms)[1] : "";
        let neck = /Neck:(.*)\n/.test(ms) ? /Neck:(.*)\n/.exec (ms)[1] : "";
        let sleeve = /Sleeve:(.*)\n/.test(ms) ? /Sleeve:(.*)\n/.exec (ms)[1] : "";
        let shoesize = /Shoe Size:(.*)\n/.test(ms) ? /Shoe Size:(.*)\n/.exec (ms)[1] : "";

        sizes.Coat = `${coatstyle.trim()} ${color.trim().toUpperCase()} ${coatsize.trim()}`.replace("  ", " ").trim();
        sizes.Shirt = `${shirt.trim()}`;
        sizes.Pants = `${pants.trim()}`;
        sizes.Waist = `${waist.trim()}`;
        sizes.Vest = `${vest.trim()}`;
        sizes.Tie = `${tie.trim()}`;
        sizes.Shoe = `${shoes.trim()} ${shoesize.trim()}`.trim();
        sizes.Height = `${height.trim()}`;
        sizes.Chest = `${chest.trim()}`;
        sizes.Neck = `${neck.trim()}`;
        sizes.Sleeve = `${sleeve.trim()}`;

        var a = true;
      }
      else{
        sizes.Coat = row["Coat Color/Size"].trim();
        sizes.Shirt = row["Shirt Color/Size"].trim();
        sizes.Pants = row["Pants Color"].trim();
        sizes.Waist = row.Waist/Outseam.trim();
        sizes.Vest = row["Vest Color/Size"].trim();
        sizes.Tie = row["Tie Style/Color "].trim();
        sizes.Shoe = row["Shoe color/Size"].trim();
        sizes.Height = row.Height.trim();
        sizes.Chest = row.Chest.trim();
        sizes.Neck = row["Neck Size"].trim();
        sizes.Sleeve = row["Sleeve Size"].trim();
      }
      if(!isEmpty(sizes)){      
        let _customersizes = await customer_sizes.findAll({where: {
          CustomerID: nu[0].ID
        }});
        let _custsize = null;
        if(_customersizes.length>0){
          //update
          let custsize = _customersizes[0];
          _custsize = await customer_sizes.update(sizes, {
            where: {
              ID: custsize.ID
            }
          });
  
        }
        else{
          //create
          sizes.CustomerID=nu[0].ID;
          _custsize = await customer_sizes.create(sizes);
        }
      }
    })
    .on('end', rowCount => {
      //console.log(`Parsed ${rowCount} rows`)
      //res.json(sizedata);
      res.json(jsondata);
    } );
  } catch (err) {
    res.status(500).send({
      message: `Error importing`
    });
  }
};


exports.importinventory = async (req, res) => {
  try {
    let jsondata = [];
    let sizedata = [];
    fs.createReadStream(path.resolve(__dirname, '\..\\assets', 'inventory.csv'))
    .pipe(fastcsv.parse({ headers: false }))
    .on('error', error => console.error(error))
    .on('data', async _row => {
      // let srow = JSON.stringify(_row);
      // let row = JSON.parse(srow);
      let row = _row;
      if(row[3]==="Barcode" || row[0]==null || row[1]==null || row[2]==null || row[3]==null || row[0]=="" || row[1]==""  || row[2]==""  || row[3]=="" ) return;

      jsondata.push(row);
      //console.log(row);
    })
    .on('end', async rowCount => {
      for(var i=0; i<jsondata.length; i++){ 
        let row = jsondata[i];
        let types = await db.inventory_types.findAll({where:{Name:row[1].trim()}});
      if(types.length==0)continue;

      let _type = types[0];

      let _inventory = await db.inventory.findAll({where: {
        InventoryTypeID: _type.ID, 
        ModelName:row[0].trim()
      }});

      let cost = 0;

      switch(row[1].trim()){
        case "Vest":
          cost=29;
          break;
          case "Pants":
            cost=39;
            break;
            case "Coat":
              cost=79.95;
              break;
              case "Shoes":
                cost=26;
                break;
                case "Shirt":
                  cost=12.95;
                  break;
                  case "Windsor Tie":
                    cost=10;
                    break;
                    case "Bow Tie":
                      cost=10;
                      break;
                      default:
                        cost=0;
      }

      let _inv = null;
      if(_inventory.length>0){
        //update
        let inv = _inventory[0];
        let update = {
          InventoryTypeID:_type.ID,
          Description:row[0].trim(),
          ModelName:row[0].trim(),
          Cost:cost
        }
        _inv = await db.inventory.update(update, {
          where: {
            ID: inv.ID
          }
        });

      }
      else{
        //create
        _inv = await db.inventory.create({
          InventoryTypeID:_type.ID,
          Description:row[0].trim(),
          ModelName:row[0].trim(),
          Cost:cost
        });
      
        _inventory= await db.inventory.findAll({where: {
          InventoryTypeID:_type.ID,
          ModelName:row[0].trim()
        }});
      }

      if(_inventory.length>0){
        let nu = _inventory[0];
        let _inventory_items = await inventory_items.findAll({where: {
          InventoryID: nu.ID, 
          Size:row[2].trim(), 
          Barcode:row[3].trim()
        }});
        let _inv_item = null;
        if(_inventory_items.length>0){
          // //update
          // let inv_item = _inventory_items[0];
          // let update = {
          //   InventoryID: nu.ID,
          //   Size:row[2].trim(), 
          //   StatusID:2,
          //   Barcode:row[3].trim()
          // }
          // _inv_item = await inventory_items.update(update, {
          //   where: {
          //     ID: inv_item.ID
          //   }
          // });
        }
        else{
          //create
          inv_item = await inventory_items.create({
            InventoryID: nu.ID,
            Size:row[2].trim(), 
            StatusID:2,
            Barcode:row[3].trim()
          });
        }
      }
      }
     
      res.json(jsondata);
    } );
  } catch (err) {
    res.status(500).send({
      message: `Error importing`
    });
  }
};
