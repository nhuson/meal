import React from 'react'
import Table from '../../../components/Table/TableTemplate'
import config from '../../../variables/config'
import moment from 'moment'

class AllergiesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: config.PAGE_SIZE,
            currentPage: 0,
        }
    }
    render() {
        let { loading, allergies, totalRecord} = this.props
        let columns = [
            { title: 'Title', field: 'title' },
			{ title: 'Description', field: 'description' },
			{ title: 'Created Date', field: 'created_at',  render: (rowData) => {
				 return moment(rowData).format('MM/DD/YYYY')
				} }
        ]
        return (
                <Table
                    showRefreshAction = {true}
                    showAddAction = {true}
                    handleRefresh =  {() => {
                        this.props.fetchAllergies(
                            this.state.currentPage + 1,
                            this.state.pageSize
                        )
                    }}
                    columns={columns}
                    data={allergies}
                    count={totalRecord}
                    page={this.state.currentPage}
                    per_page={this.state.pageSize}
                    title='List Allergies And Restrictions'
                    actions={[
                        {
                            name: 'edit', onClick: (event, rowData) => {
                                this.props.handleEdit(rowData)
                            }, color: 'green',
                        },
                        {
                            name: 'delete', onClick: (event, rowData) => {
                                this.props.handleDelete(rowData)
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
            this.props.fetchAllergies(currentPage, this.state.pageSize)
            this.setState({
                currentPage: page
            })
        }
    }

    componentDidMount() {
        this.props.fetchAllergies(this.state.currentPage, this.state.pageSize)
    }
}

export default AllergiesList