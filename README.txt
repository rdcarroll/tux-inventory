todo:
x-create ticket during order create
x-update ticket for each order or order item change
-add table for payments
-wire up payments
-add table for inventory item activities
-wire up check in and check out
-account for landry, lost, etc.




                        <table>
                            <tr>
                                <td>
                                    <table>
                                        <tr>
                                            <td>
                                                <img class="mr-auto" src="{{assetPath}}images/CorpLog2.jpg" style="height:80px;padding: 0px 0px 20px 0px;"/>
                                            </td>
                                            <td>
                                                <div>{{company.Name}}</div>
                                                <div>{{company.Address}}</div>
                                                <div>{{company.City}}, {{company.State}}</div>
                                                <div>{{company.Email}}</div>
                                                <div>{{company.Phone}}</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                                <td>
                                    <table>
                                        <tr>
                                            <td>
                                                Customer
                                            </td>
                                            <td>
                                                <div>{{order.Customer.FullName}}</div>
                                                <div>{{order.Customer.Address}}</div>
                                                <div>{{order.Customer.Email}}</div>
                                                <div>{{order.Customer.Phone}}</div>
                                            </td>
                                        </tr>
                                    </table>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label">Date</label>
                                        <div class="col-md-8">
                                            <span class=" form-control-plaintext">{{now | date}}</span>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <div class="form-group row">
                                        <label class="col-md-4 col-form-label">Order Number</label>
                                        <div class="col-md-8">
                                            <span class=" form-control-plaintext">{{order.ID}}</span>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2">
                                    <table class="table table-striped table-condensed">
                                    <thead>
                                      <tr>
                                          <th>Type</th>
                                          <th>Style</th>
                                          <th>Description</th>
                                          <th>Size</th>
                                          <th>Price</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr *ngFor="let item of order.OrderItems">
                                          <td>{{item.Inventory.InventoryType.Name}}</td>
                                          <td>{{item.Inventory.ModelName}}</td>
                                          <td>{{item.Inventory.Description}}</td>
                                          <td>{{item.ItemSize}}</td>
                                          <td>{{item.Cost | currency}}</td>
                                      </tr>
                                      <tr>
                                          <td colspan="4" class="text-right">Total</td>
                                          <td>{{total | currency}}</td>
                                      </tr>
                                    </tbody>
                                </table>
                                </td>
                            </tr>
                        </table>

