import React, { Component } from 'react';
import styles from './Invoice.module.scss'
import uuidv4 from 'uuid/v4'
import LineItems from '../LineItems'

class Invoice extends Component {
    
    locale = 'en-US'
    currency = 'USD'

    state = { 
        date: new Date().toLocaleDateString(),
        carInfo: {
          YMM: '',
          LicensePlate: '',
          VIN: '',
          Mileage: 0,
        },
        hourlyRate: 0,
        taxRate: 0.00,
        labor: 0,
        lineItems: [
            {   
                id: 'initial',
                item: '',
                description: '',
                quantity: 0,
                price: 0.00,

            },
        ]
     }
     // handles all the input changes on the Invoice level components i.e. labor and taxRate
     handleInvoiceChange = (e) => {
       this.setState({[e.target.name]: e.target.value})
     }
     
     handleLineItemChange = (elementIndex) => (event) => {
       let lineItems = this.state.lineItems.map((item, i) => {
         if (elementIndex !== i) return item
         return {...item, [event.target.name]: event.target.value }
       })
       this.setState({lineItems})
     }

     handleAddLineItem = (event) => {
      this.setState({
        // use optimistic uuid for drag drop; in a production app this could be a database id
        lineItems: this.state.lineItems.concat(
          [{ id: uuidv4(), name: '', description: '', quantity: 0, price: 0.00 }]
        )
      })
    }

    handleRemoveLineItem = (elementIndex) => (event) => {
      this.setState({
        lineItems: this.state.lineItems.filter((item, i) => {
          return elementIndex !== i
        })
      })
    }

    handleReorderLineItems = (newLineItems) => {
      this.setState({
        lineItems: newLineItems,
      })
    }
  
    handleFocusSelect = (event) => {
      event.target.select()
    }

    formatCurrency = (amount) => {
      return (new Intl.NumberFormat(this.locale, {
        style: 'currency',
        currency: this.currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      }).format(amount))
    }
  
    // calcTaxAmount = (c) => {
    //   return c * (this.state.taxRate / 100)
    // }

    calcLaborAmount = () => {
      return (this.state.labor * this.state.hourlyRate)
    }
  
    calcLineItemsTotal = () => {
      return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
    }
  
    calcTaxTotal = () => {
      return (this.calcLineItemsTotal() + this.calcLaborAmount()) * (this.state.taxRate / 100)
    }
  
    calcGrandTotal = () => {
      return this.calcLineItemsTotal() + this.calcLaborAmount() + this.calcTaxTotal() 
    }

    render() { 
        return ( 
            <div className={styles.invoice}>
            {/* <div className={styles.brand}>
              <img src="https://via.placeholder.com/150x50.png?text=logo" alt="Logo" className={styles.logo} />
            </div> */}
            <h3>Customer Invoice</h3>
            <div className={styles.addresses}>
              <div className={styles.from}>
                <strong>Professional Automotive</strong><br />
                  123 Kensington Ave<br />
                  Toronto, ON, Canada &nbsp;A1B2C3<br />
                  416-555-1234
              </div>
              <div>
                <div className={`${styles.valueTable} ${styles.to}`}>
                  <div className={styles.row}>
                    <div className={styles.label}>Customer #</div>
                    <div className={styles.value}>123456</div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Invoice #</div>
                    <div className={styles.value}>0000{this.props.numberOfInvoices}</div>
                  </div>
                  <div className={styles.row}>
                    <div className={styles.label}>Date</div>
                    <div className={`${styles.value} ${styles.date}`}>{this.state.date}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt4 flex justify-between">
              <div className="tl">
                <strong>Billed To</strong>
              </div>
              <div className="tr">
              <strong>James Walker</strong><br />
                  123 Sesame Street<br />
                  Albany, NY &nbsp;01252<br />
                  416-555-1234
              </div>
                
              </div>
            
            <h3>Car Information</h3>
            <div class="mt4 mb4">
                <div class="overflow-auto">
                  <table class="f6 w-100 mw8 center" cellspacing="0">
                    <thead>
                      <tr>
                        <th class="fw6 bb b--black-20 tl  bg-white">Y/M/M</th>
                        <th class="fw6 bb b--black-20 tl bg-white">Lic #</th>
                        <th class="fw6 bb b--black-20 tl bg-white">Vin #</th>
                        <th class="fw6 bb b--black-20 tl bg-white">Mileage</th>
                      </tr>
                    </thead>
                    <tbody class="lh-copy">
                      <tr>
                        <td class="pv3 pr3 bb b--black-20">2014 Nissan Rogue</td>
                        <td class="pv3 pr3 bb b--black-20">F49KB97</td>
                        <td class="pv3 pr3 bb b--black-20">14419232532474675</td>
                        <td class="pv3 pr3 bb b--black-20">53000</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            <LineItems
            items={this.state.lineItems}
            currencyFormatter={this.formatCurrency}
            addHandler={this.handleAddLineItem}
            changeHandler={this.handleLineItemChange}
            focusHandler={this.handleFocusSelect}
            deleteHandler={this.handleRemoveLineItem}
            reorderHandler={this.handleReorderLineItems}
          />
            <div className={styles.totalContainer}>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Tax Rate (%)</div>
                <div className={styles.value}>
                    <input name="taxRate" type="number" step="0.01" value={this.state.taxRate} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} />
                </div>
                <div className={styles.label}>Hourly Labor Rate</div>
                <div className={styles.value}>
                    <input name="hourlyRate" type="number" step="0.01" value={this.state.hourlyRate} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} />
                </div>
                <div className={styles.label}>Labor Hours</div>
                <div className={styles.value}>
                    <input name="labor" type="number" step="0.01" value={this.state.labor} onChange={this.handleInvoiceChange} onFocus={this.handleFocusSelect} />
                </div>
              </div>
            </div>
          </form>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Subtotal</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLineItemsTotal())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Labor ({this.state.labor} hrs)</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLaborAmount())}</div>
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Tax ({this.state.taxRate}%)</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcTaxTotal())}</div>
              </div>
              
              <div className={styles.row}>
                <div className={styles.label}>Total Due</div>
                <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcGrandTotal())}</div>
              </div>
            </div>
          </form>
        </div>

        <div className={styles.pay}>
          <button className={styles.payNow} onClick={this.handlePayButtonClick}>Print</button>
        </div>
            </div>
         );
    }
}
 
export default Invoice;