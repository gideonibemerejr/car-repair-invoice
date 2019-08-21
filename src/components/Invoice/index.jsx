import React, { Component } from 'react';
import styles from './Invoice.module.scss'

import LineItems from '../LineItems'

class Invoice extends Component {
    
    local = 'en-US'
    currency = 'USD'

    state = { 
        date: new Date().toLocaleDateString() ,
        taxRate: 0.00,
        lineItems: [
            {   
                
                item: '',
                description: '',
                quantity: 0,
                price: 0.00,

            },
        ]
     }
    render() { 
        return ( 
            <div className={styles.invoice}>
            {/* <div className={styles.brand}>
              <img src="https://via.placeholder.com/150x50.png?text=logo" alt="Logo" className={styles.logo} />
            </div> */}
            <div className={styles.addresses}>
              <div className={styles.from}>
                <strong>Wagner Automotive</strong><br />
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
            <h2>Invoice</h2>
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
              </div>
            </div>
          </form>
          <form>
            <div className={styles.valueTable}>
              <div className={styles.row}>
                <div className={styles.label}>Subtotal</div>
                {/* <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcLineItemsTotal())}</div> */}
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Tax ({this.state.taxRate}%)</div>
                {/* <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcTaxTotal())}</div> */}
              </div>
              <div className={styles.row}>
                <div className={styles.label}>Total Due</div>
                {/* <div className={`${styles.value} ${styles.currency}`}>{this.formatCurrency(this.calcGrandTotal())}</div> */}
              </div>
            </div>
          </form>
        </div>

        <div className={styles.pay}>
          <button className={styles.payNow} onClick={this.handlePayButtonClick}>Pay Now</button>
        </div>
            </div>
         );
    }
}
 
export default Invoice;