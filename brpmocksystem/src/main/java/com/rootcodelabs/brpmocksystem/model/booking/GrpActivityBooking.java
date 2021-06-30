package com.rootcodelabs.brpmocksystem.model.booking;

import javax.validation.constraints.NotNull;

/**
 * Model class for group booking activity.
 */
public class GrpActivityBooking {

    @NotNull
    private int groupActivity;

    private boolean allowWaitingList;

    public GrpActivityBooking() {
    }

    public GrpActivityBooking(int groupActivity, boolean allowWaitingList) {
        this.groupActivity = groupActivity;
        this.allowWaitingList = allowWaitingList;
    }

    public boolean isAllowWaitingList() {
        return allowWaitingList;
    }

    public void setAllowWaitingList(boolean allowWaitingList) {
        this.allowWaitingList = allowWaitingList;
    }

    public int getGroupActivity() {
        return groupActivity;
    }

    public void setGroupActivity(int groupActivity) {
        this.groupActivity = groupActivity;
    }

}
