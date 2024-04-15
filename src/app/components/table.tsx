"use client"
import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { dataSource } from '../utils/data';
import { headStyle, inputsStyle, monedaStyle, spanStyle, generalSpan } from './stylesComponents';

interface Record {
  ID_ATRIBUTO: string;
  DESCRIPCION_ATRIBUTO: string;
  ORIGEN_ATRIBUTO: string;
  ORDEN: number;
  SUMAREN: string | null;
} 

const divFlex: React.CSSProperties = { 
    display: 'flex',
};

const filteredDataSource: Record[] = dataSource.filter(item => item.ORIGEN_ATRIBUTO !== 'I');
const sortedDataSource = filteredDataSource.sort((a, b) => a.ORDEN - b.ORDEN); //corregi que los datos se ordenaran dinamicamente (automatico)

//este es el componente principal
const MainTable: React.FC = () => {

  const [creditValues, setCreditValues] = useState<{ [key: string]: number }>({});
  const [totalCredit, setTotalCredit] = useState<number>(0);
  const [debitValues, setDebitValues] = useState<{ [key: string]: number }>({});
  const [totalDebit, setTotalDebit] = useState<number>(0);
  const [netSalary, setNetSalary] = useState<number>(0);

  useEffect(() => {

    const calculateTotalCredit = () => {
      const totalCredit = Object.values(creditValues).reduce((acc, currentValue) => acc + (parseFloat(currentValue.toString()) || 0), 0);
      return totalCredit.toFixed(2);
    };

    setTotalCredit(parseFloat(calculateTotalCredit()));

  }, [creditValues]);

  useEffect(() => {

    const calculateTotalDebit = () => {
      const totalDebit = Object.values(debitValues).reduce((acc, currentValue) => acc + (parseFloat(currentValue.toString()) || 0), 0);
      return totalDebit.toFixed(2);
    };

    setTotalDebit(parseFloat(calculateTotalDebit()));

  }, [debitValues]);

  useEffect(() => {

    const netSalary = totalCredit - totalDebit;
    setNetSalary(netSalary);

  }, [totalCredit, totalDebit]);

  const creditHandleCreditInputChange = (recordId: string, value: string) => {

    setCreditValues(prevState => ({
      ...prevState,
      [recordId]: parseFloat(value) || 0,
    }));

  };

  const debitHandleInputChange = (recordId: string, value: string) => {
    
    setDebitValues(prevState => ({
      ...prevState,
      [recordId]: parseFloat(value) || 0,
    }));

  };

  //aqui se está usando ANT DESIGN 
  const columns = [

    {
      title: 'DESCRIPCIÓN',
      dataIndex: 'DESCRIPCION_ATRIBUTO',
      key: 'DESCRIPCION_ATRIBUTO',
      render: (text: string, record: Record) => {

        if (record.ORIGEN_ATRIBUTO === 'G') {
          return <span style={generalSpan}>{text}</span>;
        }

        return text;
      },

    },

    {
      title: 'DÉBITO',
      dataIndex: 'ORIGEN_ATRIBUTO',
      key: 'ORIGEN_ATRIBUTO',
      render: (text: string, record: Record) => {

        if (record.ID_ATRIBUTO === '110') {

            //USO EL ID_ATRIBUTO SOLO PARA SELECCIONAR QUE ESTE ES EL CAMPO QUE SE UTILIZA PARA LA SUMA
            //Y POR ESO TODOS LOS CAMPOS DE DEBITO QUE SON "SUMAREN": "110" SE SUMARÁN AQUÍ 
          return <span style={spanStyle}>SUMA TOTAL = RD${totalDebit}</span>;

        } 
        else if (record.ORIGEN_ATRIBUTO === 'D') {
          
            return (

            <div style={divFlex}>
              <p style={monedaStyle}>RD$</p>
              <input
                type="number"
                style={inputsStyle}
                onChange={e => debitHandleInputChange(record.ID_ATRIBUTO, e.target.value)}
              />
            </div>
            
          );
        }

      },

    },

    {
      title: 'CRÉDITO',
      dataIndex: 'ORIGEN_ATRIBUTO',
      key: 'ORIGEN_ATRIBUTO2',
      render: (text: string, record: Record) => {

        if (record.ID_ATRIBUTO === '50') {
            //USO EL ID_ATRIBUTO SOLO PARA SELECCIONAR QUE ESTE ES EL CAMPO QUE SE UTILIZA PARA LA SUMA
            //Y POR ESO TODOS LOS CAMPOS DE DEBITO QUE SON "SUMAREN": "50" SE SUMARÁN AQUÍ 
          return <span style={spanStyle}>SUMA TOTAL = RD${totalCredit}</span>;
        } 
        else if (record.DESCRIPCION_ATRIBUTO === 'INGRESOS NETOS') {
            return <span style={spanStyle}>TOTAL NETO = RD${netSalary}</span>;
        }
        else if (record.ORIGEN_ATRIBUTO === 'C') {
          
            return (
                <div style={divFlex}>
                    <p style={monedaStyle}>RD$</p>
                    <input
                        type="number"
                        style={inputsStyle }
                        onChange={e => creditHandleCreditInputChange(record.ID_ATRIBUTO, e.target.value)}
                    />
                </div>
            );
        } 

      },

    },
    
  ];

  return (

    <Table
      dataSource={sortedDataSource}
      columns={columns}
      size="middle"
      className="custom-table"
      pagination={false}
      style={headStyle}
    />

  );
};

export default MainTable;
