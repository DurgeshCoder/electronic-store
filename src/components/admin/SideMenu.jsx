import { ListGroup } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { AiOutlineHome } from 'react-icons/ai'
import { MdCategory } from 'react-icons/md'
import { BiCategory, BidCategory } from 'react-icons/bi'
import { RiFolderAddLine } from 'react-icons/ri'
function SideMenu() {
    return (
        <div>
            <ListGroup>
                <ListGroup.Item action as={NavLink} to="/admin/home" >
                    <AiOutlineHome size={20} />
                    <span className="ms-1">Home</span></ListGroup.Item>
                <ListGroup.Item action as={NavLink} to="/admin/add-category" >
                    <MdCategory size={20} />
                    <span className="ms-1">Add Category</span></ListGroup.Item>
                <ListGroup.Item action as={NavLink} to="/admin/categories" >
                    <BiCategory size={20} />
                    <span className="ms-1">View Categories</span></ListGroup.Item>
                <ListGroup.Item action >
                    <RiFolderAddLine size={20} />
                    <span className="ms-1"> Add Product</span></ListGroup.Item>
                <ListGroup.Item action >View Products</ListGroup.Item>
                <ListGroup.Item action >Orders</ListGroup.Item>
                <ListGroup.Item action >Users</ListGroup.Item>
                <ListGroup.Item action as={NavLink} to="/users/home" >User Dashboard</ListGroup.Item>
                <ListGroup.Item action >Logout</ListGroup.Item>
            </ListGroup>
        </div>
    )
}

export default SideMenu