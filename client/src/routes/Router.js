import React, { Fragment } from 'react';
import Header from '../components/Header'
import Footer from '../components/Footer'
import AppNavbar from '../components/AppNavbar'
import PostCardList from './normalRoute/PostCardList';
import PostWrite from './normalRoute/PostWrite';
import { Container } from 'reactstrap';
import { Redirect, Route, Switch } from 'react-router-dom';
import PostDetail from './normalRoute/PostDetail';
import CategoryResult from './normalRoute/CategoryResult';
import Search from './normalRoute/Search';

const MyRouter = () => (
    <Fragment>
        <AppNavbar/>
        <Header />
        <Container id='main-body'>
            <Switch>
                <Route path='/' exact component={PostCardList}></Route>
                <Route path='/post' exact component={PostWrite}></Route>
                <Route path='/post/:id' exact component={PostDetail}></Route>
                <Route path='/post/category/:categoryName' exaxt component={CategoryResult}></Route>
                <Route path='/search/:keyword' exact component={Search}></Route>
                <Redirect from='*' to='/'></Redirect>
            </Switch>
        </Container>
        <Footer />
    </Fragment>
)

export default MyRouter;