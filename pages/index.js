import COLORS from "../constants/colors"
import { Button, H1, Layout, Container, List, UnOrderList, Card,CardHeader,Image,CardFooter,H2, Loader,CardBody } from "../styles/index"
import ENDPOINTS from "../constants/endpoints";
import axios from "axios";
import { useState } from "react";
import getConfig from 'next/config'
import { toast } from 'react-toastify';
const { publicRuntimeConfig } = getConfig();
const { BACKEND_BASE_URL } = publicRuntimeConfig;

const NO_OF_USERS_TO_SHOW = 4;

const index = () => {

    const [ users, setUsers ] = useState([]);
    const [ loadbuttonState, setLoadButtonState ] = useState(false);
    const [ usersFetched, setUsersFetched ] = useState(false);
    const [ pageNumber, setpageNumber ] = useState(1);
    const [ currentUser, setCurrentUser ] = useState(0);
    const [ loading, setLoading ] = useState(false)

    const arrayPagination = (array, page_size, page_number) => array.slice((page_number - 1) * page_size, page_number * page_size)

    const partialUsersArray = arrayPagination(users, NO_OF_USERS_TO_SHOW , pageNumber);

    const fetchUsers = async () => {
        setLoading(true)
        setLoadButtonState(true)

        try {
            const response = await axios.get(`${BACKEND_BASE_URL}${ENDPOINTS.USERS}`);
            setUsers(response.data)
            setUsersFetched(true)
            setLoading(false)


        } catch (error) {
            toast(error.message)
            setUsersFetched(false)
            setLoadButtonState(false)
            setLoading(false)

        }
    }

    const nextUserHandler = () => {

        if( currentUser < NO_OF_USERS_TO_SHOW - 1 ) 
            setCurrentUser( currentUser + 1 )

        if( users.length > pageNumber * NO_OF_USERS_TO_SHOW && currentUser === NO_OF_USERS_TO_SHOW - 1 ) {
            setpageNumber(pageNumber + 1)
            setCurrentUser(0)
        }

        if( partialUsersArray.length < NO_OF_USERS_TO_SHOW ) 
            setCurrentUser( partialUsersArray.length - 1 )

    }

    const previousUserHandler = () => {

        if( currentUser > 0 ) 
            setCurrentUser( currentUser - 1 )

        if( currentUser === 0 ) {
            setpageNumber( pageNumber > 1 ? pageNumber - 1 : 1 )
            setCurrentUser( pageNumber === 1 ? 0 : NO_OF_USERS_TO_SHOW - 1 )
        }
    }

    return (
        <Layout bg={ usersFetched }>
            <Container>
                <CardHeader>
                    <H1 display="inline-block">Users</H1>
                    <Button btnName={ loading ? "Loading..." : "Load users"}
                            bg={ !loading && usersFetched ? COLORS.disable : loading && !usersFetched ? COLORS.loading : COLORS.black}
                            onClick={fetchUsers}
                            disabled={loadbuttonState}
                    />
                    <Button btnName="Next user"
                            bg={COLORS.black}
                            onClick={ nextUserHandler }
                    />
                    <Button btnName="Previous user"
                            bg={COLORS.black}
                            onClick={ previousUserHandler }
                    />
                </CardHeader>
                <Card>
                    <UnOrderList>
                    {
                        partialUsersArray.map((user,index) => {
                            return (
                                <List key={index} border={ currentUser === index }>{user.firstName}</List>
                            )
                        })
                    }
                    </UnOrderList>
                    <UnOrderList>
                        {
                            users.length > 0 && 
                            <CardBody>
                                <Image src={partialUsersArray[currentUser].picture}/>
                                <List>{partialUsersArray[currentUser].firstName}</List>
                            </CardBody>

                        }
                    </UnOrderList>
                </Card>
                <CardFooter>
                    <H2>Button State</H2>
                    <div>
                    <Button btnName="Loading...."
                            bg={COLORS.loading}
                    />
                    <Button btnName="Disable"
                            bg={COLORS.disable}
                    />
                    </div>
                    
                </CardFooter>
            </Container>
            
        </Layout>
    )
}


export default index
