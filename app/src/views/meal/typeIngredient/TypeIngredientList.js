import React from 'react'
import Table from '../../../components/Table/TableTemplate'
import config from '../../../variables/config'
import moment from 'moment'

class TypeIngredientList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: config.PAGE_SIZE,
            currentPage: 0,
        }
    }
    render() {
        let { loading, typeIngredients, totalRecord} = this.props
        let columns = [
            { title: 'Title', field: 'title' },
			{ title: 'Description', field: 'description' },
			{ title: 'Created Date', field: 'created_at',  render: (rowData) => {
				 return moment(rowData).format('MM/DD/YYYY')
				} }
        ]
        return (
            <div>
                <Table
                    showRefreshAction = {true}
                    showAddAction = {true}
                    handleRefresh =  {() => {
                        this.props.fetchTypeIngredients(
                            this.state.currentPage + 1,
                            this.state.pageSize
                        )
                    }}
                    handleCreate = {this.props.handleCreate}
                    columns={columns}
                    data={typeIngredients}
                    count={totalRecord}
                    page={this.state.currentPage}
                    per_page={this.state.pageSize}
                    title='List Ingredient-Type'
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
            </div>
        )
    }

    changePage(event, page) {
        let currentPage = page + 1
        if (event) {
            this.props.fetchTypeIngredients(currentPage, this.state.pageSize)
            this.setState({
                currentPage: page
            })
        }
    }

    componentDidMount() {
        this.props.fetchTypeIngredients(this.state.currentPage, this.state.pageSize)
    }
}

export default TypeIngredientList