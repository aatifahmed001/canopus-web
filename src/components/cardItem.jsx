import React from 'react';
import {
        FontAwesomeIcon
    } from '@fortawesome/react-fontawesome'

const CardItem = (props) => {
    let element = {}
    if (props.item) {
        element = props.item;
    } else {
        element = {
            title: '',
            icon: '',
            details: ['', '', ''],
            lastUsed: '',
            state: ''
        }
    }

    return (
        <div>
            <div className={(props.loading) ? 'shine' : 'nobg'}>
                <div className="icon">
                    {!props.loading ? (
                        <span><FontAwesomeIcon icon="info-circle" size="sm" /></span>

                    ) : (
                            <span></span>
                        )}
                </div>
            </div>
            <div className={`shimmer-text-container ${(props.loading) ? "shine" : "nobg"}`}>
                <div className='lines head'>{element.title}</div>
                {element.details.map(function (det, index) {
                    return <div key={'cardDetails_' + index + '_' + det} className="lines">{det}</div>
                })}
            </div>
            <div className={`shimmer-date-container ${(props.loading) ? "shine" : "nobg"}`}>
                <div className="date head hightlight">{element.lastUsed}</div>
                <div className="date">{element.state}</div>
            </div>
        </div>
    );
};

export default CardItem;