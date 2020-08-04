import { createSelector } from 'reselect';
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
);

//Converts the Object data into an array
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => Object.keys(collections).map(key => collections[key])
)

//Retrieves the data in an object form
export const selectCollection = memoize((collectionUrlParam) =>
    createSelector(
        [selectCollections],
        collections =>collections[collectionUrlParam]
    )
);