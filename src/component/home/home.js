import './home.css';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
export default () => {
    let { register, handleSubmit, formState: { errors } } = useForm();
    let dispatch = useDispatch();


    const addAmount = (userData) => {
        dispatch({
            type: 'ADD_AMOUNT',
            payload: userData
        })
    }

    let detailHistory = useSelector(function(store){
        return store.dataSection;
    });

    let currBalance = 0;
    let incomeBalance = 0;
    let newData = useSelector(function (store) {
        return store.dataSection.income;
    });
    for (let data of newData) {
        incomeBalance += parseInt(data.amount);
        currBalance += parseInt(data.amount);
    }
    let expence = 0;
    let expData = useSelector(function (store) {
        return store.dataSection.expence;
    })
    for (let data of expData) {
        currBalance += parseInt(data.amount)
        expence += parseInt(data.amount)
    }

    return <>
        <span className='main-heading'>Expence Tracker</span><br /><br />

        <div className='main-div' >

            <div className='sec-div'>
                <span>CURRENT BALANCE</span><br />
                <span id='curr-blz' className='curr-blz'>{"$" + currBalance + ".00"}</span>
                <div className='balance-div'> <br />
                    <div className='income_div'>
                        <span>INCOME</span> <br />
                        <span className='income-blz'> {incomeBalance + ".00"}</span>
                    </div>
                    <div className='expance-div'>
                        <span>EXPENCE</span><br />
                        <span className='ecpence-blz'>{expence + ".00"}</span>
                    </div>
                </div>
                <div className='detail-div'>
                    <h3>Transaction History</h3>
                </div><br />
                {detailHistory.income.map(function(data, meraIndex){
                    return <div className='detail'>
                        <div id='det' className='text-detail'><span>{data.detail}</span></div>
                        <div className='amount-detail'><span>+{data.amount}$</span></div>
                        <div className='close'>
                        <button onClick={function(){
                            dispatch({
                                type:"DELETE_DETAIL",
                                meraIndex
                            })
                        }} className='close-btn'>X</button>
                        </div>
                    </div>})}
                    {detailHistory.expence.map(function(data, meraIndex){
                        return <div className='detail exp'>
                        <div className='text-detail'><span>{data.detail}</span></div>
                        <div className='amount-detail'><span>{data.amount}$</span></div>
                        <div className='close'>
                            <button onClick={function(){
                            dispatch({
                                type:"DELETE_DETAIL_EXP",
                                meraIndex
                            })
                        }} className='close-btn'>X</button>
                        </div>
                    </div>})
                    }

                <div className='add_div'>
                    <h3>Add New Transaction</h3>
                </div><br />
                <form onSubmit={handleSubmit(addAmount)} className='input-div'>
                    <label>Description:</label>
                    <input {...register('detail', { required: true })} type="text" placeholder="Detail of Transaction" /><br />
                    <label>Transaction Amount:</label>
                    <input {...register('amount', { required: true })} type="number" placeholder="Dollar Value of Transaction" /><br />
                    <button className='btn'>Add Transaction</button>
                </form>

            </div>

        </div>


    </>
};