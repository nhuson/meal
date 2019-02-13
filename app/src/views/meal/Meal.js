import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Table from '../../components/Table/TableTemplate'
import config from '../../variables/config'
// import ConfirmPopup from '../../components/ConfirmPopup'
// import Modal from '../../components/Modal'

class Meal extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: config.PAGE_SIZE,
            currentPage: 0,
            userEdit: ''
        }
    }

    render() {
        let columns = [
            { title: 'Title', field: 'meal_title' },
            { title: 'Image', field: 'meal_image' },
            { title: 'Instruction', field: 'instruction' },
            { title: 'Category', field: 'category_title' },
            { title: 'Allergi type', field: 'allergi_type_title' },
            { title: 'Menu', field: 'menu_type_title' },
            { title: 'Time', field: 'meal_time' },
            { title: 'Serving', field: 'meal_serving' },
            { title: 'Rate', field: 'menu_type_title' },
            { title: 'Status', field: 'meal_is_pro', lookup: { 0: 'Normal', 1: 'Pro' } }
        ]
        return (
            <div>
                {/* <ConfirmPopup
                    open={this.props.openConfirmPopup}
                    title='Are you sure you want to delete this user?'
                    description="This user will be deleted from the database and don't display for later."
                    handeDisagree={this.props.handlePopupDisagree}
                    handleAgree={this.props.handlePopupAgree}
                /> */}
                {/* <Modal open={openModal} handleClose={handleClose} title="Edit user">
                    <EditFrom
                        user={this.state.userEdit}
                        requesting={requesting}
                        handleClose={handleClose}
                        handleUpdateUser={this.props.handleUpdateUser}
                    />
                </Modal> */}
                <Table
                    columns={columns}
                    data={this.props.meals}
                    count={this.props.totalRecord}
                    page={this.state.currentPage}
                    per_page={this.state.pageSize}
                    title="List Meals"
                    actions={[
                        {
                            name: 'edit', onClick: (event, rowData) => {

                            }, color: 'green',
                        }
                    ]}
                    options={{ exportButton: true }}
                    onChangePage={(event, page) => {
                        this.changePage(event, page)
                    }}
                    onChangeRowsPerPage={(event, perPage) => {
                        let pageSize = parseInt(perPage.key)
                        this.setState({
                            pageSize
                        })
                        this.props.getUserAvailble(this.state.currentPage, pageSize)
                    }}
                    loading={this.props.loading}
                    handleCreate={() => {this.handleCreate()}}
                    handleRefresh={() => {this.props.getMealAvailble(this.state.currentPage, this.state.pageSize)}}
                />
            </div>
        )
    }

    changePage(event, page) {
        let currentPage = page + 1
        if (event) {
            this.props.getUserAvailble(currentPage, this.state.pageSize)
            this.setState({
                currentPage: page
            })
        }
    }

    handleCreate() {
        console.log('===')
    }

    componentDidMount() {
        this.props.getMealAvailble(this.state.currentPage, this.state.pageSize)
    }
}

export default Meal
