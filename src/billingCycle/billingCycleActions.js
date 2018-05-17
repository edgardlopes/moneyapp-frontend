import axios from 'axios'
import {toastr} from 'react-redux-toastr'
import {reset as resetForm, initialize} from 'redux-form'
import {showTabs, selectTab} from '../common/tab/tabActions'
import Consts from '../consts'

const INITIAL_VALUES = {credits: [{}], debits: [{}]}

export function getList(){
    const request = axios.get(`${Consts.API_URL}/billingCycles`)
    return {
        type: 'BILLING_CYCLES_FETCHED',
        payload: request
    }
}

export function create(values){
    return submit(values, 'post')
}

export function update(billingCycle){
    return submit(billingCycle, 'put')
}

export function remove(billingCycle){
    return submit(billingCycle, 'delete')
}

function submit(values, method){
    return dispatch => {
        axios[method](`${Consts.API_URL}/billingCycles/${values._id || ''}`, values).then(resp => {
            toastr.success('Sucesso', 'Operação realizada com sucesso')
            dispatch(init())
        }).catch(e => e.response.data.errors.forEach(error => toastr.error('Erro', error)))    
    }
}

export function showUpdate(billingCycle){
    return [
        showTabs('tabUpdate'),
        selectTab('tabUpdate'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function showDelete(billingCycle){
    return [
        showTabs('tabDelete'),
        selectTab('tabDelete'),
        initialize('billingCycleForm', billingCycle)
    ]
}

export function init(){
    return [
        showTabs('tabList', 'tabCreate'),
        selectTab('tabList'),
        getList(),
        initialize('billingCycleForm', INITIAL_VALUES)
    ]
}