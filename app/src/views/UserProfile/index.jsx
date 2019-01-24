import React from 'react'
import Table from '../../components/Table/TableTemplate'
import config from '../../variables/config'
import UserAvatar from 'react-user-avatar'

class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: config.PAGE_SIZE,
            currentPage: 0,
        }
    }
    render() {
        let { loading, users, totalRecord, totalPage } = this.props
        let columns = [
            {
                title: 'Avatar', field: 'avatar', render: (rowData) => {
                    if (!rowData.avatar)
                        return (<UserAvatar style={{color: '#fff'}} size="36" name={rowData.fullname.toUpperCase()} colors={['#22cd69', '#e77d00', '#8f43b1', '#d38fda']}/>)
                    return (<UserAvatar size="36" name={rowData.fullname.toUpperCase()} src={`${config.S3_URL}/100x100/${rowData.avatar}`}/>)    
                }
            },
            { title: 'Fullname', field: 'fullname' },
            { title: 'Email', field: 'email' },
            { title: 'Role', field: 'role' },
            { title: 'Status', field: 'status', lookup: { 0: 'Active', 1: 'Blocked' } }
        ]
        return (
            <Table
                columns={columns}
                data={users}
                count={totalRecord}
                page={this.state.currentPage}
                per_page={this.state.pageSize}
                title="List User"
                actions={[
                    {
                        name: 'delete', onClick: (event, rowData) => {
                            alert('You clicked user ' + rowData.name)
                        }, color: 'green'
                    }
                ]}
                detailPanel={[
                    {
                        tooltip: `Show detail user`,
                        render: rowData => {
                            return (
                                <div
                                    style={{
                                        fontSize: 100,
                                        textAlign: 'center',
                                        color: 'white',
                                        backgroundColor: '#43A047',
                                    }}
                                >
                                    {rowData.name}
                                </div>
                            )
                        },
                    }
                ]}
                onChangePage={(event, page) => {
                    this.changePage(event, page)
                }}
                onChangeRowsPerPage={(perPage) => {
                    // console.log(perPage, '========')
                    // this.setState({
                    //     pageSize: perPage
                    // })
                    // this.props.getUserAvailble(this.state.currentPage, this.state.pageSize)
                }}
                loading={loading}
            />
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

    componentDidMount() {
        this.props.getUserAvailble(this.state.currentPage, this.state.pageSize)
    }
}

export default UserProfile