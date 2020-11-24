import React from 'react';
import './Pagination.css';

const MAX_PAGES_BUTTONS = 9;
const LEFT_PAGES_BUTTONS = Math.ceil(MAX_PAGES_BUTTONS/2);
const RIGHT_PAGES_BUTTONS = Math.floor(MAX_PAGES_BUTTONS/2);

export default class Pagination extends React.Component {
    render() {
        const totalPages = this.props.totalPages;
        const currentPage = this.props.currentPage;

        const buttons = this.decideButtons(currentPage, totalPages);

        const leftArrowButton = (buttons.leftArrow ? this.createButton('<', totalPages) : null);
        const rightArrowButton = (buttons.rightArrow ? this.createButton('>', totalPages) : null);

        const numbersRange = Array.from(new Array(buttons.to-buttons.from+1), (x, i) => (i+buttons.from));
        const numberButtons = numbersRange.map((number) => {
            const currentCheck = (currentPage === number);
            return this.createButton(number, totalPages, currentCheck);
        });

        return (
            <div className="pagination">
                {leftArrowButton}
                {numberButtons}
                {rightArrowButton}
            </div>
        );
    }



    onClickButton = (page) => {
        this.props.getPageCallback(page);
    };



    createButton = (value, totalPages, current=false) => {
        var classNames = 'pagination-button';

        var eventValue = value;
        var visibleValue = value;

        if (['<', '>'].includes(value)) {
            classNames += ' pagination-button-arrow';
            eventValue = (value === '<') ? 1 : totalPages;
        }
        else if (current)
            classNames += ' paginaton-button-current';
        
        return (
            <div
                className={classNames}
                onClick={() => this.onClickButton(eventValue)}
            >{visibleValue}</div>
        );
    };
    
    decideButtons = (currentPage, totalPages) => {

        if (totalPages <= MAX_PAGES_BUTTONS) return {
            from: 1,
            to: (totalPages < 1 ? 1 : totalPages),
            leftArrow: false,
            rightArrow: false
        };

        var from;
        var to;
        var leftArrow;
        var rightArrow;

        if (currentPage <= LEFT_PAGES_BUTTONS) {
            leftArrow = false;
            from = 1;
        }
        else {
            leftArrow = true;
            from = currentPage - (LEFT_PAGES_BUTTONS-1);
        }

        
        if (currentPage >= totalPages-RIGHT_PAGES_BUTTONS) {
            rightArrow = false;
            to = totalPages;
        }
        else {
            rightArrow = true;
            to = currentPage + RIGHT_PAGES_BUTTONS;
        }

        if (!leftArrow) {
            to = Math.min(to+((LEFT_PAGES_BUTTONS-1)-(currentPage-from)), totalPages);
        }

        if (!rightArrow) {
            from = Math.max(from-(RIGHT_PAGES_BUTTONS-(to-currentPage)), 1);
        }

        return {
            from,
            to,
            leftArrow,
            rightArrow
        };
    };
}