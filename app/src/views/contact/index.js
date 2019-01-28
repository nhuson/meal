import React from 'react'
import Table from '../../components/Table/TableTemplate'
import config from '../../variables/config'
import UserAvatar from 'react-user-avatar'

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            pageSize: config.PAGE_SIZE,
            currentPage: 0,
        }
    }
    render() {
        let { loading, contacts, totalRecord} = this.props
        let columns = [
            {
                title: 'Avatar', field: 'avatar', render: (rowData) => {
                    if (!rowData.avatar)
                        return (
                            <UserAvatar style={{color: '#fff'}}
                                size="45"
                                name={rowData.fullname.toUpperCase()} 
                                colors={['#22cd69', '#e77d00', '#8f43b1', '#d38fda', '#2196f3', '#1a237e', '#009688', '#388e3c']}/>)
                    return (<UserAvatar 
                                size="45" 
                                name={rowData.fullname.toUpperCase()} 
                                src={`${config.S3_URL}/100x100/${rowData.avatar}`}/>)    
                }
            },
            { title: 'Fullname', field: 'fullname' },
            { title: 'Email', field: 'email' },
            { title: 'Title', field: 'title' },
            { title: 'Messages', field: 'messages'}
        ]
        return (
            <Table
                columns={columns}
                data={contacts}
                count={totalRecord}
                page={this.state.currentPage}
                per_page={this.state.pageSize}
                title='List Contacts'
                actions={[
                    {
                        name: 'edit', onClick: (event, rowData) => {
                            alert('You clicked user ' + rowData.name)
                        }, color: 'green'
                    },
                    {
                        name: 'delete', onClick: (event, rowData) => {
                            alert('You clicked user ' + rowData.name)
                        }, color: 'green'
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
            this.props.fetchContact(currentPage, this.state.pageSize)
            this.setState({
                currentPage: page
            })
        }
    }

    componentDidMount() {
        this.props.fetchContact(this.state.currentPage, this.state.pageSize)
    }
}

export default Contact