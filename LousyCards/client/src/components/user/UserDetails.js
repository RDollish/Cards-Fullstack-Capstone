import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Table } from "reactstrap";
import { getUserDetailsById } from "../../modules/userProfileManager";


const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserDetailsById(id)
            .then(userData => {
                setUser(userData)
            })
    }, [])

    return (
        <>
            <Table>
                <tbody>
                    <tr>
                        <th>Userame</th>
                        <td>{user.displayName}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Creation Date</th>
                        <td>{user.createdAt}</td>
                    </tr>
                </tbody>
            </Table>
        </>
    )
}

export default UserDetails;