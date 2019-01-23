import React from 'react'
import Table from '../../components/Table/Table'
class UserProfile extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loading: true
        }
    }

    render() {
        return (
            <Table
                columns={[
                    { title: 'Adi', field: 'name' },
                    { title: 'Soyad', field: 'surname' },
                    { title: 'Dogum', field: 'birthYear', type: 'numeric' },
                    { title: 'Dog', field: 'birthCity', lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' } }
                ]}
                data={[
                    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
                    { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 }
                ]}
                title="List User"
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
                onChangePage={(page) => {alert('You clicked user ' + page)}}
                onChangeRowsPerPage={(perPage) => {alert('You clicked user ' + perPage)}}
            />
        )
    }
}

export default UserProfile