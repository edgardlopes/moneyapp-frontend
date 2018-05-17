import React, { Component } from 'react'
import {reduxForm, Field, formValueSelector} from 'redux-form'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'

import LabelAndInput from '../common/form/labelAndInput'
import {init} from './billingCycleActions'
import ItemList from './itemList';
import Summary from './summary'


class BillingCycleForm extends Component {

    calculateSummary() {
        const sum = (t, v) => t + v
        const credits = this.props.credits || []
        const debits = this.props.debits || []

        return {
            sumOfCredits: this.props.credits.map(c => +c.value || 0).reduce(sum, 0),
            sumOfDebits: this.props.debits.map(d => +d.value || 0).reduce(sum,0)
        }
    }

    render (){
        const {handleSubmit, readOnly, credits, debits} = this.props
        const {sumOfCredits, sumOfDebits} = this.calculateSummary()
        return (
            <form role='form' onSubmit={handleSubmit}>
                <div className="box-body">
                    <Field name='name' component={LabelAndInput} readOnly={readOnly}
                            label='Nome' cols='12 4' placeholder='Nome...'/>
                    <Field name='month' component={LabelAndInput} type='number' label='Mês' readOnly={readOnly}
                            cols='12 4' placeholder='Mês...'/>
                    <Field name='year' component={LabelAndInput} type='number' label='Ano' readOnly={readOnly}
                            cols='12 4' placeholder='Ano...'/>

                    <Summary credit={sumOfCredits} debit={sumOfDebits}/>

                    <ItemList cols='12 6' readOnly={readOnly} list={credits} field='credits' legend='Créditos' />
                    <ItemList cols='12 6' readOnly={readOnly} list={debits} field='debits' legend='Débitos' showStatus={true} />                    
                </div>
                <div className="box-footer">
                    <button type='submit' className={`btn btn-${this.props.submitClass}`}>
                        {this.props.submitLabel}
                    </button>
                    <button type='button' className='btn btn-default' onClick={this.props.init}>Cancelar</button>
                </div>
            </form>
        )
    }
}

BillingCycleForm = reduxForm({form: 'billingCycleForm', destroyOnUnmount: false})(BillingCycleForm)

const selector = formValueSelector('billingCycleForm')

const mapStateToProps = state => ({
    credits: selector(state, 'credits'),
    debits: selector(state, 'debits')
})
const mapDispatchToProps = dispatch => bindActionCreators({init}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleForm)