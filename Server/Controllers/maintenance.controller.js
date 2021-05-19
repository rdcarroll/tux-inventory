const fastcsv = require('fast-csv');
const path = require('path');
const fs = require('fs');

const db = require("../Models");
const customers = db.customers;
const customer_sizes = db.customer_sizes;

exports.importcustomers = async (req, res) => {
  try {
    let jsondata = [];
    fs.createReadStream(path.resolve(__dirname, '\..\\assets', 'customers.csv'))
    .pipe(fastcsv.parse({ headers: true }))
    .on('error', error => console.error(error))
    .on('data', async row => {
      if(row["Last Name"] == null) return;

      jsondata.push(row);
      //console.log(row);
      let _customers = await customers.findAll({where: {
        //LastName:'Carroll'
        LastName: row["Last Name"], 
        Phone:row["Phone Number"], 
        Email:row["Email Address"]
      }});
      if(_customers.length>0){
        //update
        let _cust = _customers[0];
        let update = {
          FirstName:row["First Name"],
          //LastName:row["Last Name"],
          //Email:row["Email Address"],
          //Phone:row["Phone Number"],
          Address:row["Street Address 1"],
          City:row["City"],
          State:row["State"],
          Zipcode:row["Postal Code"],
          Birthday:row["Birthdate"],
        }
        await customers.update(update, {
          where: {
            ID: _cust.ID
          }
        });

      }
      else{
        //create
        let _cust = await customers.create({
          FirstName:row["First Name"],
          LastName:row["Last Name"],
          Email:row["Email Address"],
          Phone:row["Phone Number"],
          Address:row["Street Address 1"],
          City:row["City"],
          State:row["State"],
          Zipcode:row["Postal Code"],
          Birthday:row["Birthdate"],
        });
      }
    })
    .on('end', rowCount => {
      //console.log(`Parsed ${rowCount} rows`)
      res.json(jsondata);
    } );
  } catch (err) {
    res.status(500).send({
      message: `Error importing`
    });
  }
};
