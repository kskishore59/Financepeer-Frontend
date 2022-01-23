import React from 'react';
import 'antd/dist/antd.css';

import { Table } from 'antd';

const DisplayTable = (props) => {

    const columns = [
  {
    title: 'USER ID',
    dataIndex: 'userId',
  },
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id - b.id,
      multiple: 3,
    },
  },
  {
    title: 'TITLE',
    dataIndex: 'title',
  },
  {
    title: 'BODY',
    dataIndex: 'body',
  },
];

const {tableData} = props

console.log(tableData)

const data = tableData


const newData = [
  {
    key: '1',
    name: 'John Brown',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'Jim Green',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'Joe Black',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'Jim Red',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

  return <div>
      <Table columns={columns} dataSource={data} onChange={onChange} />
  </div>;
};

export default DisplayTable;
