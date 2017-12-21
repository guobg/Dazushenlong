import {post} from './request';
import {url} from './ServiceUrl';
import {getUser} from './UserStore';

export function save(objectKey, params) {
    params.company_id = getUser().company_id;
    return post(url.commSave, {
        save_data: JSON.stringify({header: params}),
        object_key: objectKey
    })
        .then((data) => {
            return Promise.resolve(data)
        })
        .catch((error) => {
            return Promise.reject(error)
        });
}

export function getListAndCount(objectKey, page_index, page_size) {
    return post(url.commGetListAndCount, {
        company_id: getUser().company_id,
        object_key: objectKey,
        page_index: page_index,
        page_size: page_size
    })
        .then((data) => {
            return Promise.resolve(data)
        })
        .catch((error) => {
            return Promise.reject(error)
        });
}

export function getList(objectKey) {
    return post(url.commGetList, {
        company_id: getUser().company_id,
        object_key: objectKey
    })
        .then((data) => {
            return Promise.resolve(data)
        })
        .catch((error) => {
            return Promise.reject(error)
        });
}

export function remove(objectKey, delete_ids) {
    return post(url.commDelete, {
        company_id: getUser().company_id,
        delete_ids: JSON.stringify(delete_ids),
        object_key: objectKey
    })
        .then((data) => {
            return Promise.resolve(data)
        })
        .catch((error) => {
            return Promise.reject(error)
        });
}