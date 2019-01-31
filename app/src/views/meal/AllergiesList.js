import React from 'react'
import Table from '../../components/Table/TableTemplate'
import config from '../../variables/config'
import moment from 'moment'
import ConfirmPopup from '../../components/ConfirmPopup'

class AllergiesList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: config.PAGE_SIZE,
            currentPage: 0,
            allergyId: -1
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
            <div>
                <ConfirmPopup 
                    open={this.props.openConfirmPopup} 
                    title='Are you sure you want to delete this allergy?'
                    description = "This allergy will be deleted from the database and don't display for later."
                    handeDisagree={this.props.handlePopupDisagree}
                    handleAgree={() => {
                        this.props.handlePopupAgree(this.state.allergyId)
                    }}
                />
                <Table
                    columns={columns}
                    data={allergies}
                    count={totalRecord}
                    page={this.state.currentPage}
                    per_page={this.state.pageSize}
                    title='List Categories'
                    actions={[
                        {
                            name: 'edit', onClick: (event, rowData) => {
                                alert('You clicked user ' + rowData.name)
                            }, color: 'green',
                        },
                        {
                            name: 'delete', onClick: (event, rowData) => {
                                this.setState({allergyId: rowData.id})
                                this.props.handleDelete()
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