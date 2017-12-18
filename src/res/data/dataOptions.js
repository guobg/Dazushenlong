import React from 'react';
import {FormattedMessage} from 'react-intl';

export const priorityOptions = [
    {
        text: <FormattedMessage
            id='high'
            defaultMessage='High'
        />,
        value: 3
    },
    {
        text: <FormattedMessage
            id='medium'
            defaultMessage='Medium'
        />,
        value: 2
    },
    {
        text: <FormattedMessage
            id='low'
            defaultMessage='Low'
        />,
        value: 1
    }
];

export const contingencyOptions = [
    {
        text: '0%',
        value: 0
    },
    {
        text: '10%',
        value: 10
    },
    {
        text: '20%',
        value: 20
    },
    {
        text: '30%',
        value: 30
    },
    {
        text: '50%',
        value: 50
    },
    {
        text: '75%',
        value: 75
    },
    {
        text: '100%',
        value: 100
    },
    {
        text: '150%',
        value: 150
    },
    {
        text: '200%',
        value: 200
    },
];


export const genderOptions = [
    {
        text: <FormattedMessage
            id='female'
            defaultMessage='Female'
        />,
        value: "F"
    }, {
        text: <FormattedMessage
            id='male'
            defaultMessage='Male'
        />,
        value: "M"
    }
];

export const staffStatusOptions = [
    {
        text: <FormattedMessage
            id='active'
            defaultMessage='Active'
        />,
        value: 'active'
    }, {
        text: <FormattedMessage
            id='inactive'
            defaultMessage='Inactive'
        />,
        value: 'inactive'
    }, {
        text: <FormattedMessage
            id='cancellation'
            defaultMessage='Cancellation'
        />,
        value: 'cancellation'
    }
];

export const positionLevelOptions = [
    {
        text: <FormattedMessage
            id='junior'
            defaultMessage='Junior'
        />,
        value: 'junior'
    },
    {
        text: <FormattedMessage
            id='intermediate'
            defaultMessage='Intermediate'
        />,
        value: 'intermediate'
    }, {
        text: <FormattedMessage
            id='senior'
            defaultMessage='Senior'
        />,
        value: 'senior'
    }
];

export const marriageOptions = [
    {
        text: <FormattedMessage
            id='unmarried'
            defaultMessage='Unmarried'
        />,
        value: '0'
    }, {
        text: <FormattedMessage
            id='married'
            defaultMessage='Married'
        />,
        value: '1'
    }
];

export const educationOptions = [
    {
        text: <FormattedMessage
            id='unmarried'
            defaultMessage='Unmarried'
        />,
        value: '0'
    }, {
        text: <FormattedMessage
            id='married'
            defaultMessage='Married'
        />,
        value: '1'
    }
];

export const yesOrNoOptions = [
    {
        text: <FormattedMessage
            id='yes'
            defaultMessage='Yes'
        />,
        value: 'yes'
    },
    {
        text: <FormattedMessage
            id='no'
            defaultMessage='No'
        />,
        value: 'no'
    }
];

export const numberOptions = [
    {
        text: 0,
        value: 0
    },
    {
        text: 1,
        value: 1
    },
    {
        text: 2,
        value: 2
    },
    {
        text: 3,
        value: 3
    }
];