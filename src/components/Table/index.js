import React from 'react';
import 'antd/dist/antd.css';
import './index.css';
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

const data = tableData.map((each) => ({
    userId: each.user_id,
    id: each.id,
    title: each.title,
    body: each.body
}))


function onChange(pagination, filters, sorter, extra) {
  console.log('params', pagination, filters, sorter, extra);
}

  return <div className='table-container'>
      <Table columns={columns} dataSource={data} onChange={onChange} />
  </div>;
};

export default DisplayTable;
