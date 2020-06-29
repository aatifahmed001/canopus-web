import React, { useState, useEffect} from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';

import CardItem from './cardItem';
import { requestService } from '../services/request';

const CardContainer = (props) => {
    var inProps = props;
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    var styling = {
        headerImage: {
            height: '25px',
            marginRight: '6px'
        },
        badge: {
            fontSize: '.8em'
        },
        containerStyle: {
            height: '100%',
            width: '100%'
        },
        actionContainer: {
            display: 'inline-flex',
            height: '25px'
        },
        dataContainer: {
            height: 'calc(100% - 25px)'
        },
        noData: {
            top: '30%',
            left: 'calc(50% - 65px)',
            position: 'relative',
            fontSize: '20px'
        }
    }

    const processResult = (result, item) => {
        let data = [];
        result.forEach(resItem => {
            let entity = {
                title: resItem[item.attributes.title],
                details: [],
                lastUsed: moment(new Date(resItem[item.attributes.lastUsed])).format('DD.MM.YY').toLocaleString(),
                state: resItem[item.attributes.state]
            }
            item.attributes.details.forEach(element => {
                entity.details.push(resItem[element]);
            });
            data.push(entity);
        });
        return data;
    }

    useEffect(() => {
        requestService.submit(inProps.item.api.url, 'get', null, inProps.item.api.parameters)
            .then(function (result) {
                if (result.status === 'success') {
                    setData(processResult(result.payload, inProps.item))
                } else {
                    setData(null)
                }
            })
            .catch(function (error) { console.error(error); /* this line can also throw, e.g. when console = {} */ })
            .finally(function () { setLoading(false); });
    }, []);

    return (
        <div style={styling.containerStyle}>
            <Card style={styling.containerStyle}>
                <CardHeader className="card-header">
                    <img src={require('../assets/images/' + inProps.item.icon)} alt="" style={styling.headerImage} />
                    <span>{inProps.item.title}</span>
                    {loading ? (<span></span>) : (<span className="muted-text" style={styling.badge}>{data.length}</span>)}
                    <span className="pull-right">
                        <button className="btn btn-link hightlight drag-handle">
                            <FontAwesomeIcon icon="arrows-alt" />
                        </button>
                        <button className="btn btn-link hightlight">
                            <FontAwesomeIcon icon="plus" />
                        </button>
                    </span>

                </CardHeader>

                <CardBody>
                    {loading ? (
                        <div className="fill-height-or-more">
                            <CardItem loading={true}></CardItem>
                        </div>
                    ) : (<div style={styling.containerStyle}>
                        {data === null || data.length === 0 ? (
                            <div style={styling.noData}>
                                <FontAwesomeIcon icon="exclamation-triangle" /><span>No Data</span>
                            </div>

                        ) : (<div>
                            <div style={styling.actionContainer}>
                                {inProps.item.actions.map(function (item, index) {
                                    return <Form.Group key={'cardItem_' + index + "_" + item.title} controlId="actionItems" style={styling.actionContainer} ><Form.Check type="checkbox" />
                                        <Form.Label>{item.name}</Form.Label>
                                    </Form.Group>
                                })}
                            </div>
                            <div style={styling.dataContainer}>
                                <div className="fill-height-or-more autoscroll">
                                    {data.map(function (item, index) {
                                        return <CardItem key={'cardItem_' + index + "_" + item.title} item={item}></CardItem>
                                    })}
                                </div>
                            </div>
                        </div>
                            )}
                    </div>
                        )}
                </CardBody>
            </Card>
        </div >
    );
};

export default CardContainer;