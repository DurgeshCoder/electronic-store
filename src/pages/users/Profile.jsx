import { useContext, useEffect, useState } from "react"
import { Alert, Col, Container, Row, Modal, Button, Card, Table, Form, Spinner } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { toast } from "react-toastify"
import UserProfileView from "../../components/users/UserProfileView"
import UserContext from '../../context/UserContext'
import { getUser, updateProfilePic, updateUser } from "../../services/user.service"
import defaultPicture from '../../assets/unnamed.jpg'
const Profile = () => {

    const userContext = useContext(UserContext)
    const { userId } = useParams()
    const [user, setUser] = useState(null)
    const [dynamicProfileUrl, setDynamicProfileUrl] = useState(defaultPicture)
    const [profileFile, setProfileFile] = useState(null)

    // modals state 
    const [show, setShow] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false)

    const handleClose = () => setShow(false);
    const handleShowModal = () => {
        console.log("showing modal")
        setShow(true)
    };




    useEffect(() => {
        // console.log("data from url userid " + userId)
        // if (userContext.userData) {
        //     getUserDataFromServer()
        // }
        getUserDataFromServer()

    }, [])

    const getUserDataFromServer = () => {
        //api call
        console.log(userContext)

        getUser(userId)
            .then(data => {
                console.log(data);
                setUser(data)
            })
            .catch(error => {
                console.log(error)
                setUser(null)
                toast.error("Error in loading user information from server !")
            })

    }


    const updateFieldHandler = (event, property) => {
        setUser({
            ...user,
            [property]: event.target.value
        })
    }


    const updateUserData = () => {
        console.log("updating user data")
        if (user.name === undefined || user.name.trim() === '') {
            toast.error("user name required !!")
            return
        }

        // ...  rest of the field

        setUpdateLoading(true)
        updateUser(user).then(updatedUser => {
            console.log(updatedUser)
            toast.success("User details updated !!")
            updateProfilePic(profileFile, user.userId)
                .then(response => {
                    console.log("image uploaded")
                    toast.success("Image updated !!")
                    setUpdateLoading(false)
                    getUserDataFromServer()
                    handleClose()

                })
                .catch(error => {
                    console.log(error)
                    toast.error("Error in uploading image")
                    setUpdateLoading(false)
                })
            // handleClose()
        }).
            catch(error => {
                console.log(error)
                // if (error.response.status == 400) {
                //     toast.error(error.response.data.name)
                // }
                toast.error("Not updated !! Error")
                setUpdateLoading(false)
            })

    }

    const handeFileChange = (event) => {
        console.log("file changed")
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader()
            reader.onload = (e) => {
                setDynamicProfileUrl(e.target.result)
                console.log(e.target.result)
                setProfileFile(event.target.files[0])
            }

            reader.readAsDataURL(event.target.files[0])
        }
    }

    //update view

    const updateViewModal = () => {
        return (
            <div>
                <Modal size="lg" animation={false} show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update the informations</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Card className=" border-0 shadow-sm " style={{
                            borderRadius: "50px"
                        }}>
                            <Card.Body>
                                <Table className="" responsive hover  >

                                    <tbody>

                                        {/* image update  */}

                                        <tr>
                                            <td>
                                                Profile Image
                                            </td>
                                            <td>

                                                <img height={200} width={200} style={{ objectFit: "cover" }} src={dynamicProfileUrl} alt="" />
                                                <Form.Control type="file"
                                                    className="mt-2"
                                                    onChange={handeFileChange}


                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Name</td>
                                            <td>
                                                <Form.Control
                                                    className="" type="text"
                                                    value={user.name}
                                                    onChange={(event) => updateFieldHandler(event, 'name')}
                                                />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Email</td>
                                            <td>{user.email}</td>
                                        </tr>
                                        <tr>
                                            <td>New Password</td>
                                            <td>
                                                <Form.Control
                                                    placeholder="Enter new password here"
                                                    type="password"
                                                    onChange={(event) => updateFieldHandler(event, 'password')}

                                                />

                                                <p>Leave the field blank for same password</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Gender</td>
                                            <td>{user.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>About</td>
                                            <td>


                                                <Form.Control as={'textarea'} value={user.about} rows={8}
                                                    onChange={(event) => updateFieldHandler(event, 'about')}
                                                />


                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Roles</td>
                                            <td>{user.roles.map(role => <div key={role.roleId}>{role.roleName}</div>)}</td>
                                        </tr>
                                    </tbody>

                                </Table>

                            </Card.Body>
                        </Card>




                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={updateUserData} disabled={updateLoading} >
                            <Spinner
                                animation="border"
                                size="sm"
                                hidden={!updateLoading}
                                className="me-2"
                            />
                            <span hidden={!updateLoading}>Updaing</span>
                            <span hidden={updateLoading}> Save Changes</span>
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>

        )
    }

    return (
        <div>
            <Container className="mt-3">
                <Row>
                    <Col md={
                        {
                            span: 10,
                            offset: 1
                        }
                    }>

                        {(user ? (

                            <>
                                <UserProfileView
                                    user={
                                        // {
                                        //     name: "Durgesh Kumar Tiwari",
                                        //     email: "durgesh@gmail.com",
                                        //     gender: 'MALE',
                                        //     about: "I am professional react developer.",
                                        //     roles: [{ roleId: 1, roleName: "Admin" }, { roleId: 2, roleName: 'NORMAL' }]
                                        // }
                                        user
                                    }

                                    handleShowModal={handleShowModal}
                                />

                                {updateViewModal()}

                            </>


                        ) : <Alert><h3 className="text-center text-uppercase m-2">User not loaded from server !</h3></Alert>)
                        }

                        {/* {userContext.userData.user.userId} */}
                    </Col>
                </Row>
            </Container>
        </div >
    )
}

export default Profile