import React from 'react'
import moment from 'moment'
import Table from '../../../components/Table/TableTemplate'
import config from '../../../variables/config'
import ImageView from "components/Image/ImageView.jsx"

class CategoryList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: config.PAGE_SIZE,
            currentPage: 0,
        }
    }
    render() {
        let { loading, categories, totalRecord} = this.props
        let columns = [
            // { title: 'Image', field: 'image', render: (rowData) => {
            //         return <ImageView
            //             image={`${config.S3_URL}/${rowData.image}`}
            //             width={'70px'}
            //             height={'70px'}
            //         />
            // }},
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
                    this.props.fetchCategories(
                        this.state.currentPage + 1,
                        this.state.pageSize
                    )
                }}
                handleCreate = {this.props.handleCreate}
                columns={columns}
                data={categories}
                count={totalRecord}
                page={this.state.currentPage}
                per_page={this.state.pageSize}
                title='List Categories'
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
            this.props.fetchCategories(currentPage, this.state.pageSize)
            this.setState({
                currentPage: page
            })
        }
    }

    componentDidMount() {
        this.props.fetchCategories(this.state.currentPage, this.state.pageSize)
    }
}

export default CategoryList