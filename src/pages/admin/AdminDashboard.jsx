import { useContext } from "react"
import { Col, Container, ListGroup, Row } from "react-bootstrap"
import { Navigate, Outlet } from "react-router-dom"
import { isAdminUser } from "../../auth/HelperAuth"
import SideMenu from "../../components/admin/SideMenu"
import UserContext from "../../context/UserContext"

const AdminDashboard = () => {


    const userContext = useContext(UserContext)

    const dashboardView = () => {
        return (
            <div>
                <Container className="p-5">

                    <Row>

                        <Col md={{
                            span: 2,
                            offset: 2
                        }}>
                            <SideMenu />
                        </Col>


                        <Col md={8} >
                            <Outlet />
                        </Col>
                    </Row>
                </Container>


            </div>
        )
    }

    return (
        (isAdminUser()) ? dashboardView() : <Navigate to="/users/home" />
    )
}

export default AdminDashboard