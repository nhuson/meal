import React from 'react'
import Table from '../../components/Table/TableTemplate'
import config from '../../variables/config'
import moment from 'moment'

class MenuTypeList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: config.PAGE_SIZE,
            currentPage: 0,
        }
    }
    render() {
        let { loading, menus, totalRecord} = this.props
        let columns = [
            { title: 'Title', field: 'title' },
			{ title: 'Description', field: 'description' },
			{ title: 'Created Date', field: 'created_at',  render: (rowData) => {
				 return moment(rowData).format('MM/DD/YYYY')
				} }
        ]
        return (
            <Table
                columns={columns}
                data={menus}
                count={totalRecord}
                page={this.state.currentPage}
                per_page={this.state.pageSize}
                title='List Menu-Type	'
                actions={[
					{
                        name: 'edit', onClick: (event, rowData) => {
                            alert('You clicked user ' + rowData.name)
                        }, color: 'green',
                    },
                    {
                        name: 'delete', onClick: (event, rowData) => {
                            alert('You clicked user ' + rowData.name)
                        }, color: 'green',
					}
				
                ]}
                onChangePage={(event, page) => {
                    this.changePage(event, page)
                }}
                onChangeRowsPerPage={(perPage) => {}}
                loading={loading}
            />
        )
    }

    changePage(event, page) {
        let currentPage = page + 1
        if (event) {
            this.props.fetchMenus(currentPage, this.state.pageSize)
            this.setState({
                currentPage: page
            })
        }
    }

    componentDidMount() {
        this.props.fetchMenus(this.state.currentPage, this.state.pageSize)
    }
}

export default MenuTypeList