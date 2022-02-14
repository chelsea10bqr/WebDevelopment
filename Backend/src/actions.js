/*
 * action types
 */
export const ADD_FOLLOWER = "ADD_FOLLOWER";


/*
 * action creator
 */
export function addFollower(follower,list) {
    return {type: ADD_FOLLOWER, follower,list}
}
