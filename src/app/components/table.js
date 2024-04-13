"use client"

import { useState, useEffect } from "react";
import { Table } from "antd" ;
import { dataSource } from "../utils/data"; //de aqui viene la data proporcionada en la prueba tecnica
import "./MainTable.css";

const filteredDataSource = dataSource.filter(item => item.ESTADO !== "I"); //estoy filtrando los datos que no quiero que aparezcan en la tabla segun lo requerido por la prueba

const headStyle = {
    backgroundColor: '#370617',
    borderRadius: '10px',
    color: '#fff'
}

export default function MainTable() {

    const [creditValues, setCreditValues] = useState({});
    const [totalCredit, setTotalCredit] = useState(0);

    const [debitValues, setDebitValues] = useState({});
    const [totalDebit, setTotalDebit] = useState(0);

    useEffect(() => {
        // aqui estoy sumando los valores de crédito
        const calculateTotalCredit = () => {
          const totalCredit = Object.values(creditValues).reduce((acc, currentValue) => acc + (parseFloat(currentValue) || 0), 0);
          return totalCredit.toFixed(2); // Redondeando por si acaso jajajaja
        };
    
        setTotalCredit(calculateTotalCredit());
      }, [creditValues]);

      useEffect(() => {
        const calculateTotalDebit = () => {
          const totalDebit = Object.values(debitValues).reduce((acc, currentValue) => acc + (parseFloat(currentValue) || 0), 0);
          return totalDebit.toFixed(2); 
        };
    
        setTotalDebit(calculateTotalDebit());
      }, [debitValues]);
    
    const creditHandleCreditInputChange = (recordId, value) => {
        // aqui simplemente estoy actualizando los imputs cada vez que se escribe
        setCreditValues(prevState => ({
            ...prevState,
            [recordId]: parseFloat(value) || 0, // Convertir a número o establecer como 0 si no es un número válido
        }));
    };

    const debitHandleInputChange = (recordId, value) => {
        setDebitValues(prevState => ({
            ...prevState,
            [recordId]: parseFloat(value) || 0,
        }));
    };


    const columns = [
        {

          title: 'DESCRIPCIÓN',
          dataIndex: 'DESCRIPCION_ATRIBUTO',
          key: 'DESCRIPCION_ATRIBUTO',
          render: (text, record) => {
              
            if (record.ORIGEN_ATRIBUTO === 'G') {
                return <span style={{ fontWeight: 'bold', fontSize: '20px' }}>{text}</span>;
              }
              return text;
            },

        },
        {

          title: 'DÉBITO',
          dataIndex: 'ORIGEN_ATRIBUTO',
          key: 'ORIGEN_ATRIBUTO',
          render: (text, record) => {
              
            if (record.ID_ATRIBUTO === '110') {
                return <span style={{color: 'green'}}>SUMA TOTAL = RD${totalDebit}</span>;
            } 
            else if (record.ORIGEN_ATRIBUTO === 'D') {
                return <div style={{display: 'flex'}}> 
                            <p style={{color: '#8d99ae', fontSize: '0.8rem', marginRight: '6px'}}>RD$</p> 
                            <input type="number" style={{border: 'solid 1px', borderColor: '#8d99ae', borderRadius: '8px', paddingLeft: '10px'}}
                            onChange={e => debitHandleInputChange(record.ID_ATRIBUTO, e.target.value)}
                            /> 
                        </div>
                }
            },

        },
        {

          title: 'CRÉDITO',
          dataIndex: 'ORIGEN_ATRIBUTO',
          key: 'ORIGEN_ATRIBUTO2',
          render: (text, record) => {
            
            if (record.ID_ATRIBUTO === '50') {
                return <span style={{color: 'green'}}>SUMA TOTAL = RD${totalCredit}</span>;
            } 
            else if (record.ORIGEN_ATRIBUTO === 'C') {
                return <div style={{display: 'flex'}}> 
                            <p style={{color: '#8d99ae', fontSize: '0.8rem', marginRight: '6px'}}>RD$</p> 
                            <input type="number" style={{border: 'solid 1px', borderColor: '#8d99ae', borderRadius: '8px', paddingLeft: '10px'}}
                            onChange={e => creditHandleCreditInputChange(record.ID_ATRIBUTO, e.target.value)}
                            /> 
                        </div>
                }
            },

        },
    ];
      

    return (
        <>
            <Table dataSource={filteredDataSource} 
                columns={columns} size="middle" 
                className="custom-table" 
                pagination={false}
                style={headStyle}/>
        </>
        
    );
}
