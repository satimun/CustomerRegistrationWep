<template>
  <div v-show="o_grid_visible" class="grid">
    <div class="navbar navbar-light bg-custom" v-if="title">
      <slot name="title" :tilteValue="title">
        <div>{{title}}</div>
      </slot>
      <div>
        <slot name="title-right">
          <b-button
            class="btn-help"
            :title="$t('dic.help')"
            variant
            v-show="helpVisible"
            @click="HelpClick"
            size="sm"
          >
            <i class="fa fa-question"></i>
          </b-button>
        </slot>
      </div>
    </div>
    <div class="nav-hide" v-if="!o_nav_visible && title"></div>
    <div
      class="navbar navbar-light bg-default pt-3 pb-3"
      :class="{'d-table w-100' : o_nav_filter}"
      v-if="o_nav_visible"
    >
      <div defualt-btn v-if="btnDefault && !o_nav_filter">
        <slot name="btnAdd" :click="onAddClick" :permission="permissiongrid.isAdd">
          <button
            class="btn btn-primary mr-1"
            @click="onAddClick($event)"
            v-if="btnAdd && permissiongrid.isAdd"
            :disabled="d_btnAdd"
          >
            <span class="fa fa-plus"></span>
            <span class="d-none d-xl-inline ml-2">{{ $t('dic.add') }}</span>
          </button>
        </slot>
        <slot
          name="btnClone"
          :click="onCloneClick"
          :permission="permissiongrid.isAdd"
          :d_btnClone="d_btnClone"
        >
          <button
            class="btn btn-success mr-1"
            @click="onCloneClick($event)"
            v-if="btnClone && permissiongrid.isAdd"
            :disabled="d_btnClone"
          >
            <span class="fa fa-clone"></span>
            <span class="d-none d-xl-inline ml-2">{{ $t('dic.clone') }}</span>
          </button>
        </slot>
        <button
          class="btn btn-info mr-1"
          @click="onViewClick($event)"
          v-if="btnView && permissiongrid.isAdd"
          :disabled="d_btnView"
        >
          <span class="fa fa-eye"></span>
          <span class="d-none d-xl-inline ml-2">{{ $t('dic.view') }}</span>
        </button>
        <button
          class="btn btn-warning mr-1"
          @click="onEditClick($event)"
          v-if="btnEdit && permissiongrid.isEdit"
          :disabled="d_btnEdit || locked"
        >
          <span class="fa fa-pencil-alt"></span>
          <span class="d-none d-xl-inline ml-2">{{ $t('dic.edit') }}</span>
        </button>
        <button
          class="btn btn-danger mr-1"
          @click="onDeleteClick($event)"
          v-if="btnDelete && permissiongrid.isDelete"
          :disabled="d_btnDelete || locked"
        >
          <span class="fa fa-trash-alt"></span>
          <span class="d-none d-xl-inline ml-2">{{ $t('dic.delete') }}</span>
        </button>
      </div>

      <slot name="nav" :selected="selected" v-if="!o_nav_filter"></slot>

      <div :class="{'d-table-row': o_nav_filter}">
        <slot name="nav-right" v-if="!o_nav_filter" :selected="selected"></slot>
        <div class="d-table-cell w-100" v-if="o_nav_filter">
          <slot name="nav-search"></slot>
        </div>
        <div
          :class="[{'d-table-cell': o_nav_filter}, {'float-right': !o_nav_filter}]"
          class="align-middle"
        >
          <b-dropdown class="btnGrid navbar-toggler" variant="default" right no-caret>
            <template v-slot:button-content>
              <div class="ellipsis">
                <span class="fa fa-ellipsis-v"></span>
              </div>
            </template>
            <b-dropdown-item v-if="o_filter" @click="onShowFilter">
              <i class="fa fa-filter fa-lg mr-1"></i>
              {{ !showFilter ? $t('dic.filter') : $t('dic.hidefilter')}}
            </b-dropdown-item>
            <b-dropdown-item @click="ExportExcel1" v-if="permissiongrid.isExport">
              <i class="far fa-file-excel fa-lg mr-2"></i>
              {{$t('dic.export1')}}
            </b-dropdown-item>
            <b-dropdown-item @click="ExportExcel2" v-if="permissiongrid.isExport">
              <i class="far fa-file-excel fa-lg mr-2"></i>
              {{$t('dic.export2')}}
            </b-dropdown-item>
            <b-dropdown-header class="dropdown-menu-size">
              <b-row>
                <i class="fa fa-cog fa-lg ml-1 mr-2"></i>
                <span class="font-lg">{{$t('dic.viewsetting')}}</span>
              </b-row>
            </b-dropdown-header>
            <b-dropdown-item @click="ResetGrid">
              <i class="fa fa-sync-alt fa-lg mr-2"></i>
              {{$t('dic.reset')}}
            </b-dropdown-item>
            <b-dropdown-form class="dropdown-form-customer">
              <b-form-checkbox v-model="selectedOnClick" @change="onSelectedOnClick" switch inline></b-form-checkbox>
              <div class="colume-title">{{$t('dic.selectedonclick')}}</div>
            </b-dropdown-form>
            <b-dropdown-form class="dropdown-form-customer">
              <b-form-checkbox v-model="grid_responsive" @change="onGridResponChange" switch inline></b-form-checkbox>
              <div class="colume-title">{{$t('dic.scrollh')}}</div>
            </b-dropdown-form>
            <b-dropdown-form class="mb-2 form-inline">
              <div class="d-flex justify-content-center">
                <label class="mr-1">{{$t('dic.show')}} :</label>
                <select class="custom-select page-show" @change="PerPageChange()" v-model="perPage">
                  <option :value="5">5</option>
                  <option :value="10">10</option>
                  <option :value="25">25</option>
                  <option :value="50">50</option>
                  <option :value="100">100</option>
                  <option :value="1000000" class="text-uppercase">{{$t('dic.all')}}</option>
                </select>
                <label class="ml-1">{{$t('dic.entries')}}</label>
              </div>
            </b-dropdown-form>
            <b-dropdown-header class="dropdown-menu-size">
              <b-row>
                <i class="fa fa-table fa-lg ml-1 mr-2"></i>
                <span class="font-lg">{{$t('dic.columshow')}}</span>
              </b-row>
            </b-dropdown-header>
            <div class="scroll-area-colunm">
              <div style="max-height:200px;width:250px">
                <template v-for="c in tableFields">
                  <template v-if="!!c.groups">
                    <template v-for="c2 in c.groups">
                      <div
                        class="col-menu d-flex align-items-stretch b-dropdown-form"
                        :key="c2.name"
                        v-if="!c2.o_col"
                      >
                        <div>
                          <b-form-checkbox v-model="c2.visible" @change="onColChange" switch inline></b-form-checkbox>
                        </div>
                        <div class="colume-title">{{ getTitle(c) + ' ' + getTitle(c2)}}</div>
                      </div>
                    </template>
                  </template>
                  <template v-else>
                    <div
                      class="col-menu d-flex align-items-stretch b-dropdown-form"
                      :key="c.name"
                      v-if="!c.o_col"
                    >
                      <div>
                        <b-form-checkbox v-model="c.visible" @change="onColChange" switch inline></b-form-checkbox>
                      </div>
                      <div class="colume-title">{{ getTitle(c) }}</div>
                    </div>
                  </template>
                </template>
              </div>
            </div>
          </b-dropdown>
        </div>
      </div>
    </div>

    <div class="pl-3 pr-3">
      <b-overlay :show="loading" opacity="0.5" rounded="sm">
        <div
          :class="[{'table-responsive': grid_responsive}, {'fix-height': grid_responsive && (perPage > 10 && (totalPage.length > 1 || perPage == tableData.length || tableData.length > 10))}]"
          @scroll="onScroll"
        >
          <table
            class="table table-striped table-hover"
            :class="{'table-sm' : o_grid_sm}"
            v-resize:throttle.100="onResize"
            :id="name"
            @keydown="onKeyDown"
          >
            <thead>
              <!-- <tr> -->
              <draggable
                v-model="tableFields"
                tag="tr"
                :disabled="!o_col_drag"
                handle=".handle"
                @change="onFieldMove"
                v-cloak
              >
                <template v-for="(field, index) in tableFields">
                  <th
                    class="freeze header-freeze"
                    v-if="field.name === '_drag'"
                    v-show="o_row_drag"
                    width="30px"
                    :rowspan="IsShowGroups() ? 2 : 1"
                    :key="'_' + field.name"
                  ></th>
                  <th
                    class="freeze header-freeze"
                    v-else-if="field.name === '_checkbox'"
                    v-show="o_col_checkbox"
                    width="32px"
                    :key="'_' + field.name"
                    :rowspan="IsShowGroups() ? 2 : 1"
                    :id="name + '_' + field.name"
                  >
                    <div class="d-flex justify-content-center">
                      <b-form-checkbox
                        v-if="!o_select_single"
                        @change="toggleAllCheckboxes($event)"
                        v-model="allSelected"
                        :indeterminate="indeterminate"
                        :class="['ml-1','grid-th-checkbox-'+trackBy]"
                      ></b-form-checkbox>
                    </div>
                  </th>
                  <th
                    class="freeze header-freeze"
                    v-else-if="field.name === '_more'"
                    width="30px"
                    :key="'_' + field.name"
                    v-show="col_viewmore && o_col_viewmore"
                    :rowspan="IsShowGroups() ? 2 : 1"
                  ></th>
                  <th
                    v-else
                    :key="'_' + field.name"
                    :id="name + '_' + field.name"
                    :class="[{'cell-edit' : field.cellEdit}, {'th-fix-group': getGroupsLength(field)}, {'th-show-filter': showFilter}]"
                    class="text-center header-freeze"
                    :style="{'min-width': grid_responsive ? field._width + 'px' : 'inherit' }"
                    :width="field.width"
                    v-show="(!field.groups || field.groups && getGroupsLength(field)) && field._show && (field.visible || field.visible === undefined)"
                    :colspan="getGroupsLength(field)"
                    :rowspan="!getGroupsLength(field) ? 2 : 1"
                    :tabindex="index"
                  >
                    <div class="th-title">
                      <span>
                        <span
                          v-show="o_col_drag"
                          class="pt-0"
                          :class="['handle', 'pull-left fa fa-bars']"
                        ></span>
                      </span>
                      <span v-html="renderTitle(field)"></span>
                      <div>
                        <b-dropdown
                          v-if="o_col_submenu"
                          class="subMenu navbar-toggler"
                          variant="default"
                          right
                          no-caret
                          @show="subMenuVisible(field, true)"
                          @hidden="subMenuVisible(field, false)"
                        >
                          <template v-slot:button-content>
                            <i class="fa fa-chevron-down"></i>
                          </template>
                          <b-dropdown-item
                            v-if="isSortable(field)"
                            @click="orderBy(field, 'asc')"
                            :active="field._direction == 'asc'"
                          >
                            <i class="fa fa-sort-alpha-down mr-1"></i>
                            {{$t('dic.sortascending')}}
                          </b-dropdown-item>
                          <b-dropdown-item
                            v-if="isSortable(field)"
                            @click="orderBy(field, 'desc')"
                            :active="field._direction == 'desc'"
                          >
                            <i class="fa fa-sort-alpha-up mr-1"></i>
                            {{$t('dic.sortdescending')}}
                          </b-dropdown-item>
                          <b-dropdown-item v-if="!field.groups" @click="columnHide(field)">
                            <i class="fa fa-eye-slash mr-1"></i>
                            {{$t('dic.hidecolumn')}}
                          </b-dropdown-item>
                          <b-dropdown-item @click="pinClicked(field)">
                            <span>
                              <i class="fa fa-thumbtack mr-1"></i>
                            </span>
                            {{isPin(field) ? $t('dic.unpin') : $t('dic.pin')}}
                          </b-dropdown-item>
                        </b-dropdown>
                      </div>
                    </div>
                    <input
                      type="search"
                      v-if="!getGroupsLength(field) && (field.filter || field.filter === undefined)"
                      class="form-control form-control-sm mt-1"
                      :class="{ 'd-none' : !showFilter}"
                      @click="filterClick($event)"
                      @keyup="filterChange($event)"
                      v-model="field.txtFilter"
                    />
                    <div
                      class="grip"
                      @click="onColClick"
                      @mousedown="onColPreResize($event, field)"
                    >&nbsp;</div>
                  </th>
                </template>
              </draggable>
              <!-- </tr> -->

              <!------------------ Header Group -------------------->
              <tr>
                <template v-for="field in tableFields">
                  <template
                    v-if="getGroupsLength(field) && field._show && (field.visible || field.visible === undefined)"
                  >
                    <template v-for="(field2, index) in field.groups">
                      <th
                        :key="'_' + field2.name"
                        :id="name + '_' + field2.name"
                        :class="[{'cell-edit' : field2.cellEdit}]"
                        class="text-center header-sub-freeze"
                        :style="{'min-width': grid_responsive ? field2._width + 'px' : 'inherit', 'top': columnSubHeight + 'px' }"
                        :width="field2.width"
                        v-show="field2._show && (field2.visible || field2.visible === undefined)"
                        :tabindex="index"
                      >
                        <div class="th-title">
                          <span></span>
                          <span v-html="renderTitle(field2)"></span>
                          <div>
                            <b-dropdown
                              v-if="o_col_submenu"
                              class="subMenu navbar-toggler"
                              variant="default"
                              right
                              no-caret
                              @show="subMenuVisible(field2, true)"
                              @hidden="subMenuVisible(field2, false)"
                            >
                              <template v-slot:button-content>
                                <i class="fa fa-chevron-down"></i>
                              </template>
                              <b-dropdown-item
                                v-if="isSortable(field2)"
                                @click="orderBy(field2, 'asc')"
                                :active="field2._direction == 'asc'"
                              >
                                <i class="fa fa-sort-alpha-down mr-1"></i>
                                {{$t('dic.sortascending')}}
                              </b-dropdown-item>
                              <b-dropdown-item
                                v-if="isSortable(field2)"
                                @click="orderBy(field2, 'desc')"
                                :active="field2._direction == 'desc'"
                              >
                                <i class="fa fa-sort-alpha-up mr-1"></i>
                                {{$t('dic.sortdescending')}}
                              </b-dropdown-item>
                              <b-dropdown-item @click="columnHide(field2)">
                                <i class="fa fa-eye-slash mr-1"></i>
                                {{$t('dic.hidecolumn')}}
                              </b-dropdown-item>
                            </b-dropdown>
                          </div>
                        </div>
                        <input
                          type="search"
                          v-if="field2.filter || field2.filter === undefined"
                          class="form-control form-control-sm mt-1"
                          :class="{ 'd-none' : !showFilter}"
                          @click="filterClick($event)"
                          @keyup="filterChange($event)"
                          v-model="field2.txtFilter"
                        />
                        <div
                          class="grip"
                          @click="onColClick"
                          @mousedown="onColPreResize($event, field2)"
                        >&nbsp;</div>
                      </th>
                    </template>
                  </template>
                </template>
              </tr>
              <!------------------ Header Group -------------------->
            </thead>

            <!-- <tbody v-cloak> -->
            <draggable
              v-model="visibleData"
              tag="tbody"
              handle=".handle"
              @change="onRowMove"
              :disabled="!o_row_drag"
              v-cloak
              v-if="visibleData.length > 0"
            >
              <template v-for="(item, itemIndex) in visibleData">
                <tr
                  :key="itemIndex"
                  :class="[{'selected' : rowSelectedClass(item)}, getTextColor(item)]"
                >
                  <template v-if="item._opt">
                    <td :colspan="countColShow">
                      <table class="table-borderless">
                        <template v-for="(field2) in tableFields">
                          <template
                            v-if="!field2.o_col && !field2._show && (field2.visible || field2.visible === undefined)"
                          >
                            <template v-if="getGroupsLength(field2)">
                              <!--Group--->
                              <template v-for="(field3) in field2.groups">
                                <tr
                                  :key="'_' + field3.name"
                                  v-if="!field2._show && (field3.visible || field3.visible === undefined)"
                                >
                                  <th v-html="renderTitleGroup(field2, field3)"></th>
                                  <template>
                                    <td
                                      :id="name + '-' + field3.name + '-' + itemIndex"
                                      @click="onCellClicked(item, field3, $event, name + '-' + field3.name + '-' + itemIndex)"
                                    >
                                      <template v-if="isCellClick(item, field3)">
                                        <cellinput
                                          :input="field3.input"
                                          @onchange="onCellEdit(item, field3, $event)"
                                          @onblur="onCellEditBlur(item, field3, $event)"
                                        ></cellinput>
                                      </template>
                                      <template v-else>
                                        <slot
                                          :name="field3.name"
                                          :item="item"
                                          :itemIndex="itemIndex"
                                        >
                                          <span v-html="getCellView(field3, item)"></span>
                                          <b-tooltip
                                            v-if="getTooltip(field3, item)"
                                            :target="name + '-' + field3.name + '-' + itemIndex"
                                            placement="top"
                                            noninteractive
                                          >
                                            <div v-html="getTooltip(field3, item)"></div>
                                          </b-tooltip>
                                        </slot>
                                      </template>
                                    </td>
                                  </template>
                                </tr>
                              </template>
                            </template>
                            <template v-else-if="!field2.groups">
                              <tr
                                :key="'_' + field2.name"
                                v-if="!field2._show && (field2.visible || field2.visible === undefined)"
                              >
                                <th v-html="renderTitle(field2)"></th>
                                <template>
                                  <td
                                    :id="name + '-' + field2.name + '-' + itemIndex"
                                    @click="onCellClicked(item, field2, $event, name + '-' + field2.name + '-' + itemIndex)"
                                  >
                                    <template v-if="isCellClick(item, field2)">
                                      <cellinput
                                        :input="field2.input"
                                        @onchange="onCellEdit(item, field2, $event)"
                                        @onblur="onCellEditBlur(item, field2, $event)"
                                      ></cellinput>
                                    </template>
                                    <template v-else>
                                      <slot :name="field2.name" :item="item" :itemIndex="itemIndex">
                                        <span v-html="getCellView(field2, item)"></span>
                                        <b-tooltip
                                          v-if="getTooltip(field2, item)"
                                          :target="name + '-' + field2.name + '-' + itemIndex"
                                          placement="top"
                                          noninteractive
                                        >
                                          <div v-html="getTooltip(field2, item)"></div>
                                        </b-tooltip>
                                      </slot>
                                    </template>
                                  </td>
                                </template>
                              </tr>
                            </template>
                          </template>
                        </template>
                      </table>
                    </td>
                  </template>
                  <template v-else>
                    <td v-if="o_row_drag" class="handle text-center align-middle">
                      <span>
                        <i class="fa fa-bars"></i>
                      </span>
                    </td>
                    <td
                      :id="name + '-_checkbox-' + itemIndex"
                      v-if="o_col_checkbox"
                      @click="toggleClick(itemIndex, $event)"
                      :class="['freeze align-middle', {'bg-warning': rowLastClick(item)}]"
                    >
                      <div class="d-flex justify-content-center">
                        <div
                          class="ml-1 custom-control"
                          :class="[{'custom-checkbox': !o_select_single}, {'custom-radio': o_select_single}]"
                        >
                          <label
                            class="custom-control-label"
                            :class="{'checked': rowSelected(item)}"
                          ></label>
                        </div>
                      </div>
                    </td>
                    <td
                      class="more-view text-center align-middle"
                      @click="onViewMore(item, itemIndex, $event)"
                      v-if="col_viewmore && o_col_viewmore"
                    >
                      <span class="text-danger" v-show="!!rowViewMoreActive(item)">
                        <i class="fa fa-lg fa-minus-circle"></i>
                      </span>
                      <span class="text-success" v-show="!rowViewMoreActive(item)">
                        <i class="fa fa-lg fa-plus-circle"></i>
                      </span>
                    </td>
                    <template v-for="(field, fieldIndex) in tableFields">
                      <template
                        v-if="!field.o_col && (field.visible || field.visible === undefined)"
                      >
                        <template v-if="getGroupsLength(field)">
                          <!--Group--->
                          <template v-for="(field2) in field.groups">
                            <td
                              @focus.prevent="onCellFocus(item, field2, $event, name + '-' + field2.name + '-' + itemIndex)"
                              @click="onCellClicked(item, field2, $event, name + '-' + field2.name + '-' + itemIndex)"
                              :key="'_' + field2.name"
                              v-if="field2._show && field._show && (field2.visible || field2.visible === undefined)"
                              :class="[field2.class, { 'freeze': isPin(field) }, { 'p1': isCellClick(item, field2)}, { 'bg-danger' : isInvalid(item, field2)}]"
                              :id="name + '-' + field2.name + '-' + itemIndex"
                              :tabindex="fieldIndex"
                            >
                              <template v-if="isCellClick(item, field2)">
                                <cellinput
                                  :input="field2.input"
                                  @onchange="onCellEdit(item, field2, $event)"
                                  @onblur="onCellEditBlur(item, field2, $event)"
                                ></cellinput>
                              </template>
                              <template v-else>
                                <slot :name="field2.name" :item="item" :itemIndex="itemIndex">
                                  <span v-html="getCellView(field2, item)"></span>
                                  <b-tooltip
                                    v-if="getTooltip(field2, item)"
                                    :target="name + '-' + field2.name + '-' + itemIndex"
                                    placement="top"
                                    noninteractive
                                  >
                                    <div v-html="getTooltip(field2, item)"></div>
                                  </b-tooltip>
                                </slot>
                              </template>
                            </td>
                          </template>
                        </template>
                        <template v-else-if="!field.groups">
                          <td
                            :key="'_' + field.name"
                            @focus.prevent="onCellFocus(item, field, $event, name + '-' + field.name + '-' + itemIndex)"
                            @click="onCellClicked(item, field, $event, name + '-' + field.name + '-' + itemIndex)"
                            v-if="field._show"
                            :class="[field.class, { 'freeze': isPin(field) }, { 'p1': isCellClick(item, field)}, { 'bg-danger' : isInvalid(item, field) }]"
                            :id="name + '-' + field.name + '-' + itemIndex"
                            :tabindex="fieldIndex"
                          >
                            <!--v-b-popover.hover.top.v-dark="getTooltip(field, item)"-->
                            <template v-if="isCellClick(item, field)">
                              <cellinput
                                :input="field.input"
                                :scrollLeft="scrollLeft"
                                @onchange="onCellEdit(item, field, $event)"
                                @onblur="onCellEditBlur(item, field, $event)"
                              ></cellinput>
                            </template>
                            <template v-else>
                              <slot :name="field.name" :item="item" :itemIndex="itemIndex">
                                <span v-html="getCellView(field, item)"></span>
                                <b-tooltip
                                  v-if="getTooltip(field, item)"
                                  :target="name + '-' + field.name + '-' + itemIndex"
                                  placement="top"
                                  noninteractive
                                >
                                  <div v-html="getTooltip(field, item)"></div>
                                </b-tooltip>
                              </slot>
                            </template>
                          </td>
                        </template>
                      </template>
                    </template>
                  </template>
                </tr>
              </template>
            </draggable>

            <tbody v-cloak v-else>
              <tr>
                <td :colspan="tableFields.length * 5" class="text-center">{{$t('dic.nodata')}}</td>
              </tr>
            </tbody>

            <tfoot v-if="o_footer_visible && tableData.length > 1">
              <tr>
                <th class="freeze footer-freeze" v-if="o_row_drag">&nbsp;</th>
                <th
                  class="freeze footer-freeze"
                  v-if="o_col_checkbox"
                  :id="name + '__checkbox_footer'"
                >&nbsp;</th>
                <th class="freeze footer-freeze" v-if="col_viewmore && o_col_viewmore">&nbsp;</th>
                <template v-for="(field, index) in tableFields">
                  <template v-if="!field.o_col && (field.visible || field.visible === undefined)">
                    <template v-if="getGroupsLength(field)">
                      <!--Group-->
                      <template v-for="(field2) in field.groups">
                        <th
                          :key="'_' + field2.name"
                          :tabindex="index"
                          class="footer-freeze"
                          :class="!field2.class ? 'text-center' : field2.class"
                          v-if="field2._show && field._show && (field2.visible || field2.visible === undefined)"
                          :id="name + '_' + field2.name + '_footer'"
                        >
                          <slot :name="field2.name + '_footer'" :field="field2">
                            <span v-html="getCellFooter(field2)"></span>
                          </slot>
                        </th>
                      </template>
                    </template>
                    <template v-else-if="!field.groups">
                      <th
                        :key="'_' + field.name"
                        :tabindex="index"
                        class="footer-freeze"
                        :class="[!field.class ? 'text-center' : field.class]"
                        v-if="field._show"
                        :id="name + '_' + field.name + '_footer'"
                      >
                        <slot :name="field.name + '_footer'" :field="field">
                          <span v-html="getCellFooter(field)"></span>
                        </slot>
                      </th>
                    </template>
                  </template>
                </template>
              </tr>
            </tfoot>
          </table>
        </div>
      </b-overlay>
    </div>
    <div class="footer-hide" v-if="totalPage.length <= 1"></div>
    <div class="navbar navbar-light bg-default footer" v-if="totalPage.length > 1">
      <div class="col-sm-12 col-md-6 mb-3 mb-md-0 pl-0">
        <div
          class="d-flex justify-content-center justify-content-sm-center justify-content-md-start"
        >
          <div class="mr-2 align-items-center d-flex">{{$t('dic.show')}} :</div>
          <select class="custom-select page-show" @change="PerPageChange()" v-model="perPage">
            <option :value="5">5</option>
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
            <option :value="100">100</option>
            <option :value="1000000" class="text-uppercase">{{$t('dic.all')}}</option>
          </select>
          <div class="ml-2 align-items-center d-flex">
            / {{tableData.length}} {{$t('dic.entries')}} &nbsp;
            <span
              class="d-none d-md-inline ml-1"
              v-if="getSelectedCount()"
            >{{ $tc('dic.rowselect', getSelectedCount(), { n: getSelectedCount()}) }}</span>
          </div>
        </div>
      </div>
      <div class="d-sm-block d-md-none">&nbsp;</div>
      <div class="col-sm-12 col-md-6 pr-0">
        <div class="d-flex justify-content-center justify-content-sm-center justify-content-md-end">
          <b-button
            class="mr-1"
            variant="outline-primary"
            :disabled="currentPage === totalPage[0]"
            v-b-tooltip.hover="{ customClass: 'd-block d-xl-none' }"
            :title="$t('dic.first')"
            @click="firstPage()"
          >
            <span class="fa fa-fast-backward"></span>
            <span class="d-none d-xl-inline ml-2" v-if="showBtnTitle">&nbsp;{{ $t('dic.first') }}</span>
          </b-button>
          <b-button
            class="mr-1"
            variant="outline-primary"
            :disabled="currentPage === totalPage[0]"
            v-b-tooltip.hover="{ customClass: 'd-block d-xl-none' }"
            :title="$t('dic.previous')"
            @click="previousPage()"
          >
            <span class="fa fa-backward"></span>
            <span class="d-none d-xl-inline ml-2" v-if="showBtnTitle">&nbsp;{{ $t('dic.previous') }}</span>
          </b-button>
          <b-form-select
            class="current-page mr-1"
            v-model="currentPage"
            v-b-tooltip.hover
            :title="$t('dic.page')"
            @change="setVisibleData()"
          >
            <option v-for="p in totalPage" :key="p" :value="p">{{p}}</option>
          </b-form-select>
          <b-button
            class="mr-1"
            variant="outline-primary"
            :disabled="currentPage === totalPage[totalPage.length - 1]"
            v-b-tooltip.hover="{ customClass: 'd-block d-xl-none' }"
            :title="$t('dic.next')"
            @click="nextPage()"
          >
            <span class="d-none d-xl-inline mr-2" v-if="showBtnTitle">{{ $t('dic.next') }}&nbsp;</span>
            <span class="fa fa-forward"></span>
          </b-button>
          <b-button
            variant="outline-primary"
            :disabled="currentPage === totalPage[totalPage.length - 1]"
            v-b-tooltip.hover="{ customClass: 'd-block d-xl-none' }"
            :title="$t('dic.last')"
            @click="lastPage()"
          >
            <span class="d-none d-xl-inline mr-2" v-if="showBtnTitle">{{ $t('dic.last') }}&nbsp;</span>
            <span class="fa fa-fast-forward"></span>
          </b-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import resize from 'vue-resize-directive'
import dic from '@/shared/dic'
import ExcelJS from 'exceljs'
import cellinput from '@/components/cellinput'
import { GetObjVal, SetObjVal, ObjCopy, IsNull, Round } from '@/shared/utils'
import { aggregationTypes } from '@/shared/define'

export default {
  i18n: {
    messages: {
      en: {
        dic: {
          rowselect: ' | {n} row selected | {n} rows selected',
          hidefilter: 'Hide Filter',
          viewsetting: 'View/Setting',
          columshow: 'Column Visible',
          scrollh: 'Scroll Horizontal',
          export1: 'Export Excel File',
          export2: 'Export Excel Visible',
          reset: 'Reset',
          selectedonclick: 'Selected On Click',
          sortascending: 'Sort Ascending',
          sortdescending: 'Sort Descending',
          hidecolumn: 'Hide Column',
          pin: 'Pin',
          unpin: 'Unpin'
        }
      },
      th: {
        dic: {
          rowselect: ' | {n} รายการเลือก | {n} รายการเลือก',
          hidefilter: 'ปิดตัวกรองข้อมูล',
          viewsetting: 'ตั้งค่า/การแสดงผล',
          columshow: 'ซ่อน/แสดงคอลัมน์',
          scrollh: 'แสดงแถบเลื่อนแนวนอน',
          export1: 'ส่งออกไฟล์ excel',
          export2: 'ส่งออกไฟล์ excel เฉพาะที่แสดง',
          reset: 'รีเซ็ต',
          selectedonclick: 'เลือกเมื่อคลิก',
          sortascending: 'เรียงลำดับจากน้อยไปมาก',
          sortdescending: 'เรียงลำดับจากมากไปน้อย',
          hidecolumn: 'ซ่อนคอลัมน์',
          pin: 'ปักหมุด',
          unpin: 'เลิกปักหมุด'
        }
      }
    },
    sharedMessages: dic
  },
  directives: {
    resize
  },
  components: {
    cellinput
  },
  props: {
    name: {
      type: String,
      required: true
    },
    multiSort: {
      type: Boolean,
      default: true
    },
    trackBy: {
      type: String,
      default: 'id'
    },
    multiSortKey: {
      type: String,
      default: 'alt'
    },
    data: {
      type: [Array, Object],
      default: null
    },
    fields: {
      type: [Array, Object],
      required: true
    },
    btnAdd: {
      type: Boolean,
      default: true /* null = visible and use Default Function, true = visible and option function */
    },
    btnClone: {
      type: Boolean,
      default: false
    },
    btnView: {
      type: Boolean,
      default: null
    },
    btnEdit: {
      type: Boolean,
      default: true
    },
    btnDelete: {
      type: Boolean,
      default: true
    },
    btnDefault: {
      type: Boolean,
      default: true
    },
    o_grid_visible: {
      type: Boolean,
      default: true
    },
    o_grid_sm: {
      type: Boolean,
      default: false
    },
    o_grid_responsive: {
      type: Boolean,
      default: false
    },
    o_col_checkbox: {
      type: Boolean,
      default: true
    },
    o_col_viewmore: {
      type: Boolean,
      default: true
    },
    o_col_submenu: {
      type: Boolean,
      default: true
    },
    o_filter: {
      type: Boolean,
      default: true
    },
    o_col_showFilter: {
      type: Boolean,
      default: false
    },
    o_mode_multiEdit: {
      type: Boolean,
      default: true
    },
    o_nav_visible: {
      type: Boolean,
      default: true
    },
    o_nav_filter: {
      type: Boolean,
      default: false
    },
    o_row_drag: {
      type: Boolean,
      default: false
    },
    o_col_drag: {
      type: Boolean,
      default: true
    },
    o_select_single: {
      type: Boolean,
      default: false
    },
    o_footer_visible: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: null
    },
    HelpClick: {
      type: Function,
      default: null
    },
    statusData: {
      type: Array,
      default: () => []
    },
    loading: {
      type: Boolean,
      default: false
    },
    locked: {
      type: Boolean,
      default: false
    },
    o_export_header: {
      type: [Array],
      default: () => []
    },
    o_export_fileName: {
      type: String,
      default: null
    },
    o_export_sheetName: {
      type: String,
      default: null
    }
  },
  computed: {
    helpVisible() { return typeof this.HelpClick === 'function' },
    locale() {
      return this.$root.$i18n.locale
    },
    settingName() {
      return 'grid_' + this.name
    },
    permissiongrid() {
      return this.$root.getPermission()
    },
    selected() {
      return this.getSelected()
    },
    countColShow() {
      let count = 1 + (this.o_row_drag ? 1 : 0)
      this.tableFields.filter(d => d._show && d.visible).forEach(d => {
        if (Array.isArray(d.groups)) {
          count += d.groups.length
        } else {
          count++
        }
      })
      return count
    },
    showBtnTitle() {
      return this.gridWidth > 1024
    }
  },
  mounted() {
    this.onRender()
    document.addEventListener('mouseup', this.onColLastResize)
    document.addEventListener('mousemove', this.onColResize)
  },
  data() {
    return {
      eventPrefix: 'grid:',
      tableData: [],
      tableFields: [],
      sortOrder: [],
      pinFields: [],
      customSetting: {},
      selectedTo: [],
      d_btnAdd: false,
      d_btnEdit: true,
      d_btnClone: true,
      d_btnView: true,
      d_btnDelete: true,
      perPage: 10,
      currentPage: 1,
      totalPage: [1],
      visibleData: [],
      visibleFields: [],
      startRow: 0,
      stopRow: 10,
      col_viewmore: false,
      showFilter: false,
      lastRowClick: {},
      lastColClick: {},
      allSelected: false,
      indeterminate: false,
      grid_responsive: document.body.clientWidth >= 768,
      workbook: null,
      selectedOnClick: true,
      currCell: null,
      lastWidth: 1,
      scrollLeft: 0,
      GetObjVal: GetObjVal,
      SetObjVal: SetObjVal,
      fieldResize: null,
      thResize: undefined,
      startOffset: null,
      isUnResize: false,
      columnSubHeight: 35,
      gridWidth: 0
    }
  },
  methods: {
    onRender() {
      this.tableFields = [
        { name: '_drag', _width: 30, visible: this.o_row_drag, o_col: true },
        { name: '_checkbox', _width: 32, pin: true, visible: this.o_col_checkbox, o_col: true },
        { name: '_more', _width: 32, visible: this.col_viewmore, o_col: true }
      ]

      this.fields.forEach(c => {
        c.visibleOrg = c.visible
        c.pinOrg = c.pin
        if (Array.isArray(c.groups)) {
          c.groups.forEach(g => {
            g.visibleOrg = g.visible
          })
        }
      })

      this.tableFields = this.tableFields.concat(this.fields)
      if (!this.$localStorage.get(this.settingName)) {
        this.genCustomSetting()
      } else {
        this.customSetting = JSON.parse(this.$localStorage.get(this.settingName))
        if (this.customSetting.fields.length != this.tableFields.length) {
          this.genCustomSetting()
          // this.customSetting = JSON.parse(this.$localStorage.get(this.settingName));
        }
        this.selectedOnClick = this.customSetting.selectedOnClick === undefined ? true : this.customSetting.selectedOnClick
        this.grid_responsive = this.customSetting.grid_responsive || this.o_grid_responsive
        this.perPage = this.customSetting.perPage
        this.showFilter = this.customSetting.showFilter || this.o_col_showFilter

        this.customSetting.fields.forEach((c, i) => {
          const tmp = this.tableFields.find(x => x.name === c.name)
          if (tmp) {
            const idx = this.tableFields.indexOf(tmp)
            if (i != idx) {
              this.tableFields.splice(idx, 1)
              this.tableFields.splice(i, 0, tmp)
            }
            if (!tmp.o_col) {
              tmp.visible = c.visible
              tmp.pin = c.pin
            }
            if (tmp.name == '_more') tmp.visible = !this.grid_responsive
            if (Array.isArray(c.groups)) {
              c.groups.forEach(g => {
                const tmp2 = tmp.groups.find(v => v.name === g.name)
                if (tmp2) tmp2.visible = g.visible
              })
            }
          }
        })
      }

      const pinCol = this.tableFields.filter(c => c.pin)
      if (pinCol.length) this.pinFields = [...pinCol]

      setTimeout(() => {
        const col = document.getElementsByClassName('th-fix-group')
        if (col.length) {
          // this.columnSubHeight = Math.min(...col.map(x => x.offsetHeight));
          this.columnSubHeight = col[0].offsetHeight
        }
      }, 1000)

      this.genTitle()
      this.setData(this.data)
      const el = document.getElementById(this.name)
      this.onResize(el)

      document.addEventListener('click', (e) => {
        this.lastColClick = null
      })
    },
    onColChange() {
      this.isUnResize = false
      const el = document.getElementById(this.name)
      this.onResize(el)
      setTimeout(() => {
        this.genCustomSetting()
      }, 100)
    },
    columnHide(field) {
      field.visible = false
      this.onColChange()
    },
    onGridResponChange() {
      setTimeout(() => {
        this.onColChange()
      })
    },
    onSelectedOnClick() {
      setTimeout(() => {
        this.genCustomSetting()
      }, 100)
    },
    onShowFilter() {
      this.showFilter = !this.showFilter
      setTimeout(() => {
        if (this.pinFields.length) {
          this.genPin()
        }
        this.genCustomSetting()
      }, 100)
    },
    genCustomSetting() {
      const fieldsCustom = []
      this.tableFields.forEach(c => {
        const col = {}
        col.name = c.name
        col.visible = c.visible
        col.pin = c.pin
        if (Array.isArray(c.groups)) {
          col.groups = []
          c.groups.forEach(g => {
            const colg = {}
            colg.name = g.name
            colg.visible = g.visible
            col.groups.push(colg)
          })
        }
        fieldsCustom.push(col)
      })
      this.customSetting = {
        fields: fieldsCustom,
        grid_responsive: this.grid_responsive,
        perPage: this.perPage,
        selectedOnClick: this.selectedOnClick,
        showFilter: this.showFilter
      }
      this.$localStorage.set(this.settingName, JSON.stringify(this.customSetting))
    },
    getWidth1(c) {
      if (c.width) {
        c._width = c.width
      } else {
        let tmpc = c._title
        if (tmpc) {
          tmpc = !tmpc ? '' : tmpc + ''
          tmpc = tmpc.replace(/[ิีืึุู์ฺํ๊๋่้็ัเไใ]*/g, '') // ิีืึุู์ฺํ๊๋่้็ัเไใ
        }
        tmpc = (this.getLength(tmpc) + 5) * 8 // 7

        c._width = !c._width ? 0 : c._width

        if (tmpc > c._width) {
          c._width = tmpc
        }
      }
    },
    getWidth2(c, r) {
      if (c.width) {
        c._width = c.width
      } else {
        let tmpc = c._title
        if (tmpc) {
          tmpc = !tmpc ? '' : tmpc + ''
          tmpc = tmpc.replace(/[ิีืึุู์ฺํ๊๋่้็ัเไใ]*/g, '') // ิีืึุู์ฺํ๊๋่้็ัเไใ
        }
        tmpc = (this.getLength(tmpc) + 5) * 8 // 7

        let tmpr = this.getCellView(c, r)
        if (tmpr) {
          tmpr = !tmpr ? '' : tmpr + ''
          tmpr = tmpr.replace(/.+>(.*)<.+/g, '$1')
          tmpr = tmpr.replace(/[ิีืึุู์ฺํ๊๋่้็ัเไใ]*/g, '') // ิีืึุู์ฺํ๊๋่้็ัเไใ
        }
        tmpr = (this.getLength(tmpr) + 5) * 8 // 7

        c._width = !c._width ? 0 : c._width

        if (tmpr > c._width || tmpc > c._width) {
          c._width = Math.max(tmpr, tmpc)
        }
      }
    },
    onResize(el) {
      if (el) {
        this.gridWidth = el.offsetWidth
      }

      if (this.isUnResize) return

      if (this.grid_responsive) {
        this.isUnResize = true
        this.tableFields.forEach(c => {
          if (c.visible || c.visible === undefined) {
            if (!c.o_col) {
              if (Array.isArray(c.groups)) {
                if (c.width) {
                  c._width = c.width
                } else {
                  this.getWidth1(c)
                  let gWidth = 0
                  c.groups.forEach(g => {
                    if (g.visible || g.visible === undefined) {
                      this.getWidth1(g)
                      gWidth += g._width
                    }
                  })
                  c._width = c._width < gWidth ? gWidth : c._width
                }
              } else {
                this.getWidth1(c)
              }
            }
          }
        })

        const show = true
        this.col_viewmore = false
        this.tableFields.forEach((c, i) => {
          if (c.visible || c.visible === undefined) {
            if (!c.o_col) {
              c._show = show
            } else {
              c._show = show
            }
            if (Array.isArray(c.groups) && show) {
              c.groups.forEach(g => {
                if (g.visible || g.visible === undefined) {
                  g._show = show
                }
              })
            }
          }
        })
        this.tableFields = this.tableFields.slice()
      } else {
        if (this.lastWidth == el.offsetWidth && !this.visibleData.length) return
        this.lastWidth = el.offsetWidth
        if (this.visibleData.length) {
          this.visibleData.forEach(r => {
            this.tableFields.forEach(c => {
              if (c.visible || c.visible === undefined) {
                if (!c.o_col) {
                  if (Array.isArray(c.groups)) {
                    if (c.width) {
                      c._width = c.width
                    } else {
                      this.getWidth2(c)
                      let gWidth = 0
                      c.groups.forEach(g => {
                        if (g.visible || g.visible === undefined) {
                          this.getWidth2(g, r)
                          gWidth += g._width
                        }
                      })
                      c._width = c._width < gWidth ? gWidth : c._width
                    }
                  } else {
                    this.getWidth2(c, r)
                  }
                }
              }
            })
          })
        } else { /// no data
          this.tableFields.forEach(c => {
            if (c.visible || c.visible === undefined) {
              if (!c.o_col) {
                if (Array.isArray(c.groups)) {
                  if (c.width) {
                    c._width = c.width
                  } else {
                    c._width = 0
                    c.groups.forEach(g => {
                      if (g.visible || g.visible === undefined) {
                        this.getWidth1(g)
                        c._width += g._width
                      }
                    })
                  }
                } else {
                  this.getWidth1(c)
                }
              }
            }
          })
        }

        let wtmp = 0
        let chkFirst = true
        let show = true
        this.col_viewmore = false
        this.tableFields.forEach((c, i) => {
          if (c.visible || c.visible === undefined) {
            wtmp += c._width
            // c.width = null;
            if (!this.grid_responsive) {
              if (wtmp >= el.offsetWidth) {
                this.col_viewmore = true
                show = false
              }
            }
            if (!c.o_col && chkFirst) {
              c._show = true
              chkFirst = false
            } else {
              c._show = show
            }
            if (Array.isArray(c.groups) && show) {
              c.groups.forEach(g => {
                if (g.visible || g.visible === undefined) {
                  g._show = show
                }
              })
            }
          }
        })
        this.tableFields = this.tableFields.slice()
      }
      if (this.pinFields.length) {
        setTimeout(() => {
          this.genPin()
        }, 1000)
      }
    },
    getLength(val) {
      return !val ? 0 : (val + '').length
    },
    genTitle() {
      this.tableFields.forEach(c => {
        if (/^dic[.]*/.test(c.title)) {
          c._title = this.GetObjVal(this.$i18n.messages[this.$i18n.locale], c.title)
        } else {
          c._title = typeof c.title === 'function' ? c.title() : c.title
        }
        if (Array.isArray(c.groups)) {
          c.groups.forEach(g => {
            if (/^dic[.]*/.test(g.title)) {
              g._title = this.GetObjVal(this.$i18n.messages[this.$i18n.locale], g.title)
            } else {
              g._title = typeof g.title === 'function' ? g.title() : g.title
            }
          })
        }
      })
    },
    getGroupsLength(field) {
      if (Array.isArray(field.groups)) {
        return field.groups.filter(x => x.visible).length
      }
      return 0
    },
    IsShowGroups() {
      return this.tableFields.find(c => Array.isArray(c.groups) && c._show)
    },
    // -------------------- view ---------------------//
    getTitle(field) {
      const title = typeof field.title === 'function' ? field.title() : field._title
      return !title ? '' : title
    },
    renderTitle(field) {
      const title = this.getTitle(field)
      return title
    },
    renderTitleGroup(field, fieldd) {
      const title = this.getTitle(field) + ' ' + this.getTitle(fieldd)
      return title
    },

    // ---------------- sort ------------------//
    isSortable(field) {
      return !(typeof field.sortField === 'undefined')
    },
    orderBy(field, direction) {
      if (!this.isSortable(field)) return

      this.sortOrder = []
      if (field._direction != direction) {
        this.sortOrder.push({
          field: field.name,
          sortField: field.sortField,
          direction: direction
        })
        field._direction = direction
      } else {
        field._direction = ''
      }
      this.sortData()
    },
    getDirection(d) {
      return d === 'asc' ? '>' : '<'
    },
    sortData(noneReset = false) {
      if (this.sortOrder.length) {
        let str = ''
        this.sortOrder.forEach((x, i) => {
          if (i == this.sortOrder.length - 1) {
            str += 'a.' + x.sortField + ' ' + this.getDirection(x.direction) + ' b.' + x.sortField + ' ? 1 '
            if (this.sortOrder.length == 1) {
              str += ': a.' + x.sortField + ' == ' + 'b.' + x.sortField + ' ? 0 '
            }
            for (let j = 0; j < i + 1; j++) {
              str += ': -1 '
            }
          } else {
            str += 'a.' + x.sortField + ' ' + this.getDirection(x.direction) + ' b.' + x.sortField + ' ? 1 : ' + 'a.' + x.sortField + ' === b.' + x.sortField + ' ? '
          }
        })
        try {
          const sort = eval('(a, b) => { return ' + str + ' }')
          this.tableData = this.tableData.slice().sort(sort)
        } catch (ex) { }
      } else {
        if (!noneReset) this.setData(this.data)
      }
      this.setVisibleData()
    },

    // --------------------- data ------------------//
    refresh() {
      this.selectedTo = []
      this.setData(this.data)
      this.onColChange()
    },
    render() {
      this.selectedTo = []
      this.onColChange()
    },
    reset() {
      this.selectedTo = []
      this.onRender()
    },
    setData(data) {
      if (data === null || typeof data === 'undefined') return
      this.tableData = []
      this.visibleData = []
      // this.selectedTo = [];
      this.lastRowClick = {}
      if (Array.isArray(data)) {
        data.forEach((x, i) => {
          x._selected = false
          let chk = true
          if (this.showFilter || this.o_footer_visible) {
            this.tableFields.forEach(y => {
              if (Array.isArray(y.groups)) {
                y.groups.forEach(g => {
                  if (g.filterTerm && g.txtFilter) {
                    if (!(g.filterTerm.test(this.GetObjVal(x, g.name, '')) || g.txtFilter == this.GetObjVal(x, g.name, ''))) {
                      chk = false
                    }
                  }

                  if (this.o_footer_visible) {
                    if (!IsNull(g.footer)) {
                      this.setFooter(g, x, !i)
                    }
                  }
                })
              } else {
                if (y.filterTerm && y.txtFilter) {
                  if (!(y.filterTerm.test(this.GetObjVal(x, y.name, '')) || y.txtFilter == this.GetObjVal(x, y.name, ''))) {
                    chk = false
                  }
                }

                if (this.o_footer_visible) {
                  if (!IsNull(y.footer)) {
                    this.setFooter(y, x, !i)
                  }
                }
              }
            })
          }
          if (chk) {
            if (this.statusData.length > 0) {
              if (this.statusData.find(y => y.value == x.status)) this.tableData.push(x)
            } else this.tableData.push(x)
          }
        })
        this.sortData(true)
        this.makePagination()
      }
    },
    setVisibleData() {
      if (IsNull(this.perPage) || !this.perPage) this.perPage = this.tableData.length < 10 ? 10 : 1000000
      this.startRow = this.perPage * (this.currentPage - 1)
      this.stopRow = (this.perPage * this.currentPage) - 1

      this.visibleData = []
      this.tableData.forEach((x, i) => {
        if (i >= this.startRow && i <= this.stopRow) {
          x._viewmore = false
          this.visibleData.push(x)
        }
      })

      if (this.tableData.length > 0 && !this.visibleData.length) {
        this.currentPage = 1
        this.setVisibleData()
        return
      }

      if (this.pinFields.length) {
        setTimeout(() => {
          this.genPin()
        }, 500)
      }
    },
    hasCallback(item) {
      return !!item.callback
    },
    callCallback(field, item) {
      if (typeof field.callback == 'function') {
        return field.callback(this.GetObjVal(item, field.name))
      }
      return this.GetObjVal(item, field.callback, '')
    },
    getCellView(field, item) {
      if (field.callback) {
        return this.callCallback(field, item)
      } else {
        return this.GetObjVal(item, field.name, '')
      }
    },
    getTooltip(field, item) {
      if (typeof field.tooltip == 'function') {
        return field.tooltip(item)
      } else {
        return field.tooltip
      }
    },
    getCellFooter(field) {
      if (!IsNull(GetObjVal(field, 'footer'))) {
        if (typeof field.callback == 'function') {
          return field.callback(field.footer.value)
        }
        return field.footer.value
      }
      return null
    },
    setFooter(field, item, reset) {
      if (field.footer.type == aggregationTypes.sum) {
        if (reset) field.footer.value = 0
        if (typeof field.footer.formula == 'function') {
          field.footer.value += field.footer.formula(item)
        } else {
          field.footer.value += Number(GetObjVal(item, field.name, 0))
        }
        field.footer.value = IsNull(GetObjVal(field.footer, 'decimal')) ? field.footer.value : Round(field.footer.value, field.footer.decimal)
      } else if (field.footer.type == aggregationTypes.percent) {
        if (reset) {
          field.footer.multi.value = 0
          field.footer.divi.value = 0
          field.footer.value = 0
        }
        if (typeof field.footer.formula == 'function') {
          field.footer.value += field.footer.formula(item, field)
        } else {
          field.footer.multi.value += Number(GetObjVal(item, field.footer.multi.field, 0))
          field.footer.divi.value += Number(GetObjVal(item, field.footer.divi.field, 0))
          field.footer.value = field.footer.divi.value > 0 ? (field.footer.multi.value / field.footer.divi.value) * 100 : 0
        }
        field.footer.value = IsNull(GetObjVal(field.footer, 'decimal')) ? field.footer.value : Round(field.footer.value, field.footer.decimal)
      } else if (field.footer.type == aggregationTypes.avg) {
        if (reset) {
          field.footer.multi.value = 0
          field.footer.divi.value = 0
          field.footer.value = 0
        }
        field.footer.multi.value += Number(GetObjVal(item, field.footer.multi.field, 0))
        field.footer.divi.value += Number(GetObjVal(item, field.footer.divi.field, 0))
        if (!IsNull(GetObjVal(field.footer, 'decimal'))) {
          field.footer.multi.value = Round(field.footer.multi.value, field.footer.decimal)
          field.footer.divi.value = Round(field.footer.divi.value, field.footer.decimal)
        }
        field.footer.value = field.footer.divi.value > 0 ? field.footer.multi.value / field.footer.divi.value : 0
        field.footer.value = IsNull(GetObjVal(field.footer, 'decimal')) ? field.footer.value : Round(field.footer.value, field.footer.decimal)
      } else if (field.footer.type == aggregationTypes.currency) {
        if (reset) {
          field.footer.value = []
        }
        if (GetObjVal(item, field.name + '.length')) {
          GetObjVal(item, field.name).forEach(n => {
            let tmp = field.footer.value.find(x => x.symbol == n.symbol)
            if (!tmp) {
              tmp = ObjCopy(n)
              tmp.amount = 0
              field.footer.value.push(tmp)
            }
            tmp.amount += Number(n.amount)
            tmp.amount = IsNull(GetObjVal(field.footer, 'decimal')) ? tmp.amount : Round(tmp.amount, field.footer.decimal)
          })
        }
      }
    },
    normalizeSortOrder() {
      this.sortOrder.forEach((item) => {
        item.sortField = item.sortField || item.field
      })
    },

    // ------------------------ filter ------------------------//
    filterClick(e) {
      e.stopPropagation()
      this.filterChange()
    },
    filterChange(e) {
      this.tableFields.forEach(f => {
        if (Array.isArray(f.groups)) {
          f.groups.forEach(g => {
            if (this.GetObjVal(f, 'filter') !== false) {
              g.filterTerm = this.GetObjVal(g, 'txtFilter', '')
              if (typeof (g.filterTerm) === 'string') {
                g.filterTerm = g.filterTerm.trim()
              }
              if (g.filterTerm) {
                g.filterTerm = g.filterTerm.replace(/[%]/g, '*') /* SoMRuk */
                g.filterTerm = g.filterTerm.replace(/([!@#$%\^&)(+=._-])/g, '[$1]') /* SoMRuk */
                g.filterTerm += '*' /* SoMRuk */
                var reText = g.filterTerm.replace(/(\\)?\*/g, function ($0, $1) { return $1 ? $0 : '[\\s\\S]*?' })
                g.filterTerm = new RegExp('^' + reText + '$', 'i')
              }
            }
          })
        } else {
          if (this.GetObjVal(f, 'filter') !== false) {
            f.filterTerm = this.GetObjVal(f, 'txtFilter', '')
            if (typeof (f.filterTerm) === 'string') {
              f.filterTerm = f.filterTerm.trim()
            }
            if (f.filterTerm) {
              f.filterTerm = f.filterTerm.replace(/[%]/g, '*') /* SoMRuk */
              f.filterTerm = f.filterTerm.replace(/([!@#$%\^&)(+=._-])/g, '[$1]') /* SoMRuk */
              f.filterTerm += '*' /* SoMRuk */
              var reText = f.filterTerm.replace(/(\\)?\*/g, function ($0, $1) { return $1 ? $0 : '[\\s\\S]*?' })
              f.filterTerm = new RegExp('^' + reText + '$', 'i')
            }
          }
        }
      })
      setTimeout(() => { this.setData(this.data) }, 1)
    },

    // ------------------------ pagination ------------------------//
    makePagination() {
      this.totalPage = []
      for (
        let i = 0;
        i < Math.ceil(this.tableData.length / this.perPage);
        i++
      ) {
        this.totalPage.push(i + 1)
      }
    },
    nextPage() {
      this.currentPage += 1
      this.setVisibleData()
    },
    previousPage() {
      this.currentPage -= 1
      this.setVisibleData()
    },
    PerPageChange() {
      this.currentPage = 1
      this.setVisibleData()
      this.makePagination()
      this.genCustomSetting()
    },
    // getNo(index) {
    //   if (index == 0) this.countIndex = 0;
    //   this.countIndex++;
    //   return this.countIndex + (this.perPage * (this.currentPage - 1))
    // },
    firstPage() {
      this.currentPage = 1
      this.setVisibleData()
    },
    lastPage() {
      this.currentPage = this.totalPage[this.totalPage.length - 1]
      this.setVisibleData()
    },

    // ------------------------- view more -------------------------//
    rowViewMoreActive(dataItem) {
      return dataItem._viewmore
    },

    // ------------------------- select ----------------------------//
    toggleClick(index, event) {
      if (event.shiftKey) {
        const lastIndex = this.getIndexLastRow()
        if (lastIndex == -1) return
        if (this.rowSelected(this.visibleData[lastIndex])) {
          if (index > lastIndex) {
            for (let i = index; i >= lastIndex; i--) {
              this.toggleCheckbox(this.visibleData[i], true)
            }
          } else {
            for (let i = index; i <= lastIndex; i++) {
              this.toggleCheckbox(this.visibleData[i], true)
            }
          }
        }
        this.toggleCheckbox(this.visibleData[index], this.rowSelected(this.visibleData[index]))
      } else {
        this.toggleCheckbox(this.visibleData[index], !this.rowSelected(this.visibleData[index]))
      }
    },
    toggleCheckbox(item, checked) {
      if (item[this.trackBy] === undefined) {
        return
      }
      const key = item[this.trackBy]
      if (checked) {
        this.selectId(key)
      } else {
        this.unselectId(key)
      }
      // set last click
      this.onRowClicked(item)
      this.$emit(this.eventPrefix + 'rowToggleSelected', this.rowSelected(item), this.name)
      this.$emit(this.eventPrefix + 'rowSelected', this.rowSelected(item), this.name)
    },
    selectId(key) {
      if (this.o_select_single) {
        this.unselectAll()
      }
      if (!this.isSelectedRow(key)) {
        this.selectedTo.push(key)
      }
    },
    unselectId(key) {
      this.selectedTo.splice(this.selectedTo.indexOf(key), 1)
    },
    unselectAll() {
      this.selectedTo = []
    },
    isSelectedRow(key) {
      return this.selectedTo.indexOf(key) >= 0
    },
    rowSelected(dataItem) {
      const key = this.GetObjVal(dataItem, this.trackBy)
      return this.isSelectedRow(key)
    },
    rowSelectedClass(dataItem) {
      const key = this.GetObjVal(dataItem, this.trackBy)
      return this.isSelectedRow(key)
    },
    rowLastClick(dataItem) {
      return this.lastRowClick[this.trackBy] == dataItem[this.trackBy]
    },
    getIndexLastRow() {
      return this.visibleData.indexOf(this.lastRowClick)
    },
    toggleAllCheckboxes(checked) {
      if (checked) {
        this.selectedTo = [...this.tableData.map(x => x[this.trackBy])]
      } else {
        this.unselectAll()
      }
      this.$emit(this.eventPrefix + 'rowToggleSelectedAll', checked, this.name)
      this.$emit(this.eventPrefix + 'rowSelected', checked, this.name)
    },
    getSelectedCount() {
      return this.selectedTo.length
    },
    getSelected() {
      return this.data.filter(item => {
        return this.selectedTo.indexOf(item[this.trackBy]) >= 0
      })
    },
    onSelected() {
      if (this.selectedTo.length) {
        this.d_btnClone = this.d_btnView = this.selectedTo.length > 1
        this.d_btnEdit = this.o_mode_multiEdit ? false : this.selectedTo.length > 1
        this.d_btnDelete = false

        if (this.GetObjVal(this.data[this.data.length - 1], 'status')) {
          if (this.data.find(item => this.selectedTo.indexOf(item[this.trackBy]) >= 0 && item.status == 'C')) {
            this.d_btnDelete = this.d_btnEdit = true
          }
        }
      } else {
        this.d_btnDelete = this.d_btnEdit = this.d_btnClone = this.d_btnView = true
      }
    },

    // ---------------------------- on click ----------------------------//
    isCellClick(item, field) {
      if (this.GetObjVal(field, 'cellEdit')) {
        if (this.GetObjVal(this.lastRowClick, this.trackBy) == item[this.trackBy]) {
          if (this.GetObjVal(this.lastColClick, 'name') == field.name) {
            return true
          }
        }
      }
      return false
    },
    isInvalid(item, field) {
      return this.GetObjVal(item, '_validation.' + field.name + '.$invalid') === true
    },
    onCellEdit(item, field, value) {
      if (this.GetObjVal(field, 'cellEdit') === true) {
        if (this.GetObjVal(item, field.name) != value) {
          this.SetObjVal(item, field.name, value)
          this.$emit(this.eventPrefix + 'onCellEditChanged', item, field, value, this.name)
        }
        // change
        // this.$emit(this.eventPrefix + "onCellEditChanged", item, field, value, this.name);
      }
      if (this.GetObjVal(this.lastColClick, 'name') == field.name && this.GetObjVal(this.lastRowClick, this.trackBy) == item[this.trackBy]) {
        this.lastColClick = null
      }
    },
    onCellEditBlur(item, field, event) {
      this.$emit(this.eventPrefix + 'onCellEditBlur', item, field, this.name)
    },
    onCellFocus(item, field, event, id) {
      this.currCell = id
      this.$emit(this.eventPrefix + 'onCellClicked', item, field, this.name)
      this.onRowClicked(item, field, event)
    },
    onCellClicked(item, field, event, id) {
      this.currCell = id
      this.$emit(this.eventPrefix + 'onCellClicked', item, field, this.name)
      this.onRowClicked(item, field, event)
    },
    onRowClicked(item, field, event) {
      if (event) {
        event.stopPropagation()
        if (this.o_col_checkbox && this.selectedOnClick) {
          this.unselectAll()
          this.selectId(item[this.trackBy])
          this.$emit(this.eventPrefix + 'rowSelected', this.rowSelected(item), this.name)
        }
      }
      if (this.GetObjVal(this.lastRowClick, this.trackBy) != item[this.trackBy] || this.GetObjVal(this.lastColClick, 'name') != this.GetObjVal(field, 'name')) {
        if (field && item && GetObjVal(event, 'type') == 'click' && (!GetObjVal(field, 'dblClickEdit') || GetObjVal(event, 'detail') == 2 || GetObjVal(event, 'detail') == 0)) {
          if (field.cellEdit) {
            this.$emit(this.eventPrefix + 'onCellEditClicked', item, field, this.name)
            field.input.value = this.GetObjVal(item, field.name)
          }
          this.lastColClick = field
        } else {
          this.lastColClick = null
        }
      }
      if (this.GetObjVal(this.lastRowClick, this.trackBy) != item[this.trackBy]) {
        this.lastRowClick = item
        this.$emit(this.eventPrefix + 'rowClicked', item, this.rowSelected(item), this.name)
      }
    },
    onViewMore(dataItem, index, e) {
      if (!dataItem._viewmore) {
        const tmp = JSON.parse(JSON.stringify(dataItem))
        tmp._opt = true
        this.visibleData.splice(index + 1, 0, tmp)
      } else {
        this.visibleData.splice(index + 1, 1)
      }
      dataItem._viewmore = !dataItem._viewmore
    },
    onAddClick() {
      this.$emit(this.eventPrefix + 'btnClick', 'Add', [], this.name)
    },
    onCloneClick() {
      const data = this.getSelected()
      this.$emit(this.eventPrefix + 'btnClick', 'Clone', data, this.name)
    },
    onViewClick() {
      const data = this.getSelected()
      this.$emit(this.eventPrefix + 'btnClick', 'View', data, this.name)
    },
    onEditClick() {
      const data = this.getSelected()
      this.$emit(this.eventPrefix + 'btnClick', 'Edit', data, this.name)
    },
    onDeleteClick() {
      const data = this.getSelected()
      this.$emit(this.eventPrefix + 'btnClick', 'Delete', data, this.name)
    },
    onRowMove(e) {
      this.$emit(this.eventPrefix + 'rowMove', e.moved, this.visibleData)
    },
    onFieldMove(e) {
      // console.log(e);
      this.genCustomSetting()
    },

    /// ////------------------------------------------ text color ---------------------------------------------------//////
    getTextColor(dataItem) {
      let color = this.GetObjVal(dataItem, 'textColor', '')
      if (this.GetObjVal(this.tableData[this.tableData.length - 1], 'status')) {
        if (dataItem.status == 'I') color = 'primary'
        else if (dataItem.status == 'C') color = 'danger'
      }
      return 'text-' + color
    },

    /// ////------------------------------------------ export excel ---------------------------------------------------//////

    CreateHeader(worksheet) {
      let currentRow = 0
      this.o_export_header.forEach(c => {
        currentRow++
        worksheet.addRows([[c]])
      })

      let head1 = []; let head2 = []; let colGroup = false
      this.fields.forEach(c => {
        if (c.visible) {
          if (Array.isArray(c.groups)) {
            c.groups.filter(g => g.visible).forEach((g, i) => {
              if (!i) head1.push(c._title)
              else head1.push(null)
              head2.push(g._title)
              colGroup = true
            })
          } else {
            head1.push(c._title)
            head2.push(null)
          }
        }
      })

      // worksheet.getRow(1).values = head1;
      currentRow++
      worksheet.addRows([head1])

      head1 = worksheet.getRow(currentRow)
      head1.font = {
        name: 'Tahoma',
        size: 11,
        bold: true,
        color: { argb: '80000000' }
      }
      head1.alignment = { vertical: 'middle', horizontal: 'center' }
      head1.height = 20

      if (colGroup) {
        let idf = 0; let idl = 0
        currentRow++
        worksheet.addRows([head2])
        this.fields.forEach(c => {
          if (c.visible) {
            if (Array.isArray(c.groups)) {
              let chk = false
              c.groups.filter(g => g.visible).forEach((g, i) => {
                if (!i) {
                  idf++; idl++
                } else idl++
                head2.push(g._title)
                colGroup = true
                chk = true
              })
              if (chk) {
                worksheet.mergeCells(currentRow - 1, idf, currentRow - 1, idl)
              }
              idf = idl
            } else {
              idf++; idl++
              worksheet.mergeCells(currentRow - 1, idf, currentRow, idl)
            }
          }
        })

        head2 = worksheet.getRow(currentRow)
        head2.font = {
          name: 'Tahoma',
          size: 11,
          bold: true,
          color: { argb: '80000000' }
        }
        head2.alignment = { vertical: 'middle', horizontal: 'center' }
        head2.height = 20
      }
    },
    getDataExcel(r) {
      const row = []
      this.fields.forEach(c => {
        if (c.visible) {
          if (Array.isArray(c.groups)) {
            c.groups.filter(g => g.visible).forEach(g => {
              let tmpr = this.getCellView(g, r)
              tmpr = !tmpr ? '' : tmpr + ''
              tmpr = tmpr.replace(/.+>(.*)<.+/g, '$1')
              if (!tmpr || isFinite(tmpr.replace(',', ''))) tmpr = this.GetObjVal(r, g.name, '')
              row.push(tmpr)
            })
          } else {
            let tmpr = this.getCellView(c, r)
            tmpr = !tmpr ? '' : tmpr + ''
            tmpr = tmpr.replace(/.+>(.*)<.+/g, '$1')
            if (!tmpr || isFinite(tmpr.replace(',', ''))) tmpr = this.GetObjVal(r, c.name, '')
            row.push(tmpr)
          }
        }
      })
      return row
    },
    ExportExcel1(e) {
      const worksheet = this.CreateExcel()
      this.CreateHeader(worksheet)
      this.data.forEach(r => {
        worksheet.addRows([this.getDataExcel(r)])
      })
      this.SaveExcel()
    },
    ExportExcel2(e) {
      const worksheet = this.CreateExcel()
      this.CreateHeader(worksheet)
      this.visibleData.forEach(r => {
        worksheet.addRows([this.getDataExcel(r)])
      })
      this.SaveExcel()
    },
    SaveExcel() {
      this.workbook.xlsx.writeBuffer().then((csvContent) => {
        const D = document
        const a = D.createElement('a')
        const strMimeType = 'application/octet-stream;charset=utf-8'
        let rawFile
        const fileName = (this.o_export_fileName || this.name) + '.xlsx'

        // html5 A[download]
        if ('download' in a) {
          const blob = new Blob(['', csvContent], { type: strMimeType })
          rawFile = URL.createObjectURL(blob)
          a.setAttribute('download', fileName)
        } else {
          rawFile = 'data:' + strMimeType + ',' + encodeURIComponent(csvContent)
          a.setAttribute('target', '_blank')
        }
        a.href = rawFile
        a.setAttribute('style', 'display:none;')
        D.body.appendChild(a)
        setTimeout(() => {
          if (a.click) {
            a.click()
            // Workaround for Safari 5
          } else if (document.createEvent) {
            var eventObj = document.createEvent('MouseEvents')
            eventObj.initEvent('click', true, true)
            a.dispatchEvent(eventObj)
          }
          D.body.removeChild(a)
        }, 100)
      })
    },
    CreateExcel() {
      this.workbook = new ExcelJS.Workbook()
      this.workbook.creator = 'KKF Connect'
      this.workbook.lastModifiedBy = 'KKF Connect'
      this.workbook.created = new Date()
      this.workbook.modified = new Date()
      this.workbook.lastPrinted = new Date()

      return this.workbook.addWorksheet(this.o_export_sheetName || this.name)
    },
    ResetGrid(event) {
      this.fields.forEach((c, i) => {
        const tmp = this.tableFields.find(x => x.name === c.name)
        if (tmp) {
          const idx = this.tableFields.indexOf(tmp)
          if (i != idx) {
            this.tableFields.splice(idx, 1)
            this.tableFields.splice(i + 3, 0, tmp)
          }
          tmp.visible = c.visibleOrg
          tmp.pin = c.pinOrg
          if (Array.isArray(c.groups)) {
            c.groups.forEach(g => {
              const tmp2 = tmp.groups.find(v => v.name === g.name)
              if (tmp2) tmp2.visible = g.visibleOrg
            })
          }
        }
      })

      this.grid_responsive = document.body.clientWidth >= 768
      this.showFilter = false
      this.selectedOnClick = true
      this.perPage = 10

      // unpin
      if (this.pinFields.length) {
        this.pinFields.forEach(c => this.unPin(c))
        this.pinFields = []
      }
      const pinCol = this.tableFields.filter(c => c.pin)
      if (pinCol.length) {
        this.pinFields.push(...pinCol)
      }
      this.PerPageChange()
      this.$emit(this.eventPrefix + 'reset', event, this.name)
    },
    onKeyDown(e) {
      if (!this.currCell) {
        return
      }
      e.stopPropagation()
      let c = document.getElementById(this.currCell)
      let ud = false
      if (e.which >= 37 && e.which <= 40) {
        const t = this.currCell.split('-')
        if (e.which == 39) { // Right Arrow
          c = c.nextElementSibling
        } else if (e.which == 37) { // previous Arrow
          c = c.previousElementSibling
        } else if (e.which == 38) { // Up Arrow
          t[t.length - 1] = parseInt(t[t.length - 1]) - 1
          c = document.getElementById(t.join('-'))
          if (!c) {
            t[t.length - 1] = parseInt(t[t.length - 1]) - 1
            c = document.getElementById(t.join('-'))
          }
          ud = true
        } else if (e.which == 40) { // Down Arrow
          t[t.length - 1] = parseInt(t[t.length - 1]) + 1
          c = document.getElementById(t.join('-'))
          if (!c) {
            t[t.length - 1] = parseInt(t[t.length - 1]) + 1
            c = document.getElementById(t.join('-'))
          }
          ud = true
        }
        if (c && c.tabIndex != -1) {
          this.currCell = c.id
          c.focus()
          // if (ud) c.click();
        }
      } else if (e.which == 13) {
        if (document.activeElement == c) {
          c.click()
        } else {
          c.focus()
        }
      }
    },
    onScroll(e) {
      this.scrollLeft = e.target.scrollLeft
    },
    onColClick(e) {
      e.stopPropagation()
    },
    onColPreResize(e, field) {
      this.thResize = document.getElementById(this.name + '_' + field.name)
      this.fieldResize = field
      if (this.thResize) {
        this.isUnResize = true
        this.startOffset = this.thResize.offsetWidth - e.pageX
      }
    },
    onColResize(e) {
      if (this.thResize) {
        this.thResize.style.minWidth = this.startOffset + e.pageX + 'px'
        this.fieldResize._width = this.startOffset + e.pageX
      }
    },
    onColLastResize(e) {
      this.thResize = undefined
      this.fieldResize = null
    },
    subMenuVisible(field, show) {
      const col = document.getElementById(this.name + '_' + field.name)
      if (show) col.classList.add('subMenuVisible')
      else col.classList.remove('subMenuVisible')
    },
    /** ************** pin  ******************/
    isPin(field) {
      return this.pinFields.indexOf(field) >= 0
    },
    pinClicked(field) {
      if (!this.isPin(field)) {
        field.pin = true
        const pinCol = this.tableFields.filter(c => c.pin)
        if (pinCol.length) this.pinFields = [...pinCol]
      } else {
        field.pin = false
        this.pinFields.splice(this.pinFields.indexOf(field), 1)
        this.unPin(field)
      }
      this.genCustomSetting()
      this.genPin()
    },
    unPin(c) {
      const colh = document.getElementById(this.name + '_' + c.name)
      if (colh) {
        colh.classList.remove('freeze')
        colh.style.left = 'inherit'
        if (Array.isArray(c.groups)) {
          c.groups.filter(c2 => c2.visible).forEach(c2 => {
            const colh2 = document.getElementById(this.name + '_' + c2.name)
            if (colh2) {
              colh2.classList.remove('freeze')
              colh2.style.left = 'inherit'
              colh2.style.zIndex = 1
              this.unPinRowFooter(c2)
            }
          })
        } else {
          this.unPinRowFooter(c)
        }
      }
    },
    unPinRowFooter(c) {
      this.visibleData.forEach((d, i) => {
        const colr = document.getElementById(this.name + '-' + c.name + '-' + i)
        if (colr) {
          colr.classList.remove('freeze')
          colr.style.left = 'inherit'
        }
      })
      const colf = document.getElementById(this.name + '_' + c.name + '_footer')
      if (colf) {
        colf.classList.remove('freeze')
        colf.style.left = 'inherit'
      }
    },
    genPin() {
      let widthh = 0
      let widths = 0
      this.pinFields.forEach(c => {
        const colh = document.getElementById(this.name + '_' + c.name)
        if (colh) {
          colh.classList.add('freeze')
          colh.style.left = widthh + 'px'
          if (Array.isArray(c.groups)) {
            c.groups.filter(c2 => c2.visible).forEach(c2 => {
              const colh2 = document.getElementById(this.name + '_' + c2.name)
              if (colh2) {
                colh2.classList.add('freeze')
                colh2.style.left = widths + 'px'
                colh2.style.zIndex = 2
                this.pinRowFooter(c2, widths)
                widths += colh2.offsetWidth
              }
            })
          } else {
            this.pinRowFooter(c, widthh)
          }
          widthh += colh.offsetWidth
          widths = widthh
        }
      })
    },
    pinRowFooter(c, width) {
      this.visibleData.forEach((d, i) => {
        const colr = document.getElementById(this.name + '-' + c.name + '-' + i)
        if (colr) {
          colr.classList.add('freeze')
          colr.style.left = width + 'px'
        }
      })
      const colf = document.getElementById(this.name + '_' + c.name + '_footer')
      if (colf) {
        colf.classList.add('freeze')
        colf.style.left = width + 'px'
      }
    }
  },
  watch: {
    data(newVal, oldVal) {
      this.selectedTo = []
      this.isUnResize = false
      if (Array.isArray(newVal)) {
        let lastRowClick = null
        if (this.lastRowClick) {
          lastRowClick = newVal.find(x => x[this.trackBy] == this.lastRowClick[this.trackBy])
        }
        this.setData(newVal)
        if (lastRowClick) {
          this.onRowClicked(lastRowClick)
        } else if (newVal.length > 0) {
          this.onRowClicked(newVal[0])
        }
      } else {
        this.data = []
      }
    },
    selectedTo(newVal, oldVal) {
      if (newVal.length === 0) {
        this.indeterminate = false
        this.allSelected = false
      } else if (newVal.length === this.tableData.length) {
        this.indeterminate = false
        this.allSelected = true
      } else {
        this.indeterminate = true
        this.allSelected = false
      }
      if (this.btnDefault) {
        this.onSelected()
      }
    },
    locale() {
      this.genTitle()
    },
    o_grid_responsive(v) {
      this.grid_responsive = v
    }
  }
}
</script>

<style scoped>
.grid {
  width: 100%;
  border-top: 1px solid #c8ced3;
}

.scroll-area-colunm {
  position: relative;
  margin: auto;
  overflow-y: overlay;
  scroll-behavior: smooth;
}

.bg-custom {
  background-color: #f0f3f5;
  border-bottom: 1px solid #c8ced3;
  flex-wrap: nowrap;
  min-height: 42.41px;
}

.table {
  background-color: #fff;
  margin-bottom: 0;
}

.table thead th {
  vertical-align: middle;
}

.table thead th.th-show-filter {
  vertical-align: bottom;
}

.table-responsive {
  margin: 0;
}

.table td,
.table th {
  padding: 0.45rem;
  border: 0;
}

.table-sm td,
.table-sm th {
  padding: 0.3rem;
  border: 0;
}

th,
th.freeze,
th.header-freeze,
th.footer-freeze {
  background-image: linear-gradient(#fff, #eee);
}

th.header-freeze.th-fix-group {
  background-image: linear-gradient(#ffffff, #f7f7f7);
}

th.header-sub-freeze {
  background-image: linear-gradient(#f7f7f7, #eee);
}

th.cell-edit {
  background-image: linear-gradient(#eefcee, #b3f7b3);
  color: #222;
}

th,
td {
  box-shadow: inset 1px 0 0 #c8ced3, inset 0 -1px 0 #c8ced3;
}
thead {
  border-bottom: 1px solid #c8ced3;
}

td:last-child {
  box-shadow: inset 1px 0 0 #c8ced3, inset -1px -1px 0 #c8ced3;
}

th.header-freeze,
th.footer-freeze {
  box-shadow: inset 1px 1px 0 #c8ced3, inset 0 -1px 0 #c8ced3;
}

th.header-freeze:last-child,
th.footer-freeze:last-child {
  box-shadow: inset 1px 1px 0 #c8ced3, inset -1px -1px 0 #c8ced3;
}

.th-title {
  display: flex;
  /* flex-wrap: wrap; */
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

tfoot tr th {
  border-top: 0;
}

.freeze {
  position: sticky;
  left: 0;
  z-index: 0;
}

.header-freeze {
  position: sticky;
  top: 0;
  z-index: 2;
}

.header-sub-freeze {
  position: sticky;
  top: 35px;
  z-index: 1;
}

.footer-freeze {
  position: sticky;
  bottom: 0;
  z-index: 0;
}

.freeze.header-freeze,
.freeze.footer-freeze {
  position: sticky;
  top: 0;
  z-index: 3;
  left: 0;
}

.subMenuVisible {
  z-index: 4;
}

.fix-height {
  height: 450px;
}

.table-striped tbody tr:nth-of-type(odd),
.table-striped tbody tr:nth-of-type(odd) .freeze {
  background-color: #f2f2f2;
}

.table-striped tbody tr:nth-of-type(even) .freeze {
  background-color: #fff;
}

.table-hover tbody tr:hover,
.table-hover tbody tr:hover .freeze {
  background-color: #ececec;
}

.selected,
.selected td,
.table-hover tbody tr.selected .freeze {
  background-color: #b9e9f8;
}

.p1 {
  padding: 0.25rem !important;
}

.page-show {
  width: 65px;
}

.current-page {
  width: 65px;
}

.more-view {
  cursor: pointer;
}

.sortable {
  cursor: pointer;
}

td {
  overflow: hidden;
  text-overflow: ellipsis;
  /* white-space: nowrap; */
  /* cursor: default; */
}

/* td.p1 {
  overflow-y: hidden;
  white-space: nowrap;
} */

.custom-control {
  position: inherit;
  padding-left: 1.3rem;
  margin-right: -0.5rem;
}
/* .custom-control-label::before {
  top: 0;
} */
.custom-control.custom-switch {
  float: left;
  margin-right: 0.15rem;
}
.colume-title {
  padding-top: 0.15rem;
  float: left;
}

.pull-right {
  padding-top: 5px;
}

.pull-left {
  padding-top: 5px;
}
.pull-left.fa-bars {
  color: #ccc;
}

.form-inline {
  padding-left: 0;
}

label {
  margin-bottom: 0rem !important;
}

.btn-help {
  padding: 0.05rem 0.5rem 0.2rem 0.5rem;
  vertical-align: top;
}

.btnGrid {
  max-height: 35px;
}

.ellipsis {
  padding-left: 0.36rem;
  padding-right: 0.37rem;
}
.fa-ellipsis-v {
  color: rgba(0, 0, 0, 0.5);
}

.custom-checkbox .custom-control-label.checked::before {
  color: #fff;
  border-color: #20a8d8;
  background-color: #20a8d8;
}

.custom-checkbox .custom-control-label.checked::after {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
}

.custom-radio .custom-control-label.checked::before {
  color: #fff;
  border-color: #20a8d8;
  background-color: #20a8d8;
}

.custom-radio .custom-control-label.checked::after {
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='-4 -4 8 8'%3E%3Ccircle r='3' fill='%23fff'/%3E%3C/svg%3E");
}

.table-responsive .table td {
  /*word-wrap: break-word;*/
  white-space: nowrap;
}

.nav-hide {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

.footer {
  padding-top: 1rem;
  padding-bottom: 1rem;
}

.footer-hide {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}

@media (max-width: 576px) {
  /*576px*/
  .form-inline {
    padding-left: 15px;
    display: block;
  }
}

/*drag drop*/
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}
.dropdown-menu-size {
  /* min-height: 20px; */
  width: 250px;
}
.dropdown-header {
  padding: 10px 20px;
  font-size: 14px;
  border-bottom: 0;
}

.handle {
  cursor: move;
}

td.handle {
  color: #ccc;
}

.grip {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 5px;
  cursor: col-resize;
}
</style>

<style>
.grid .subMenu button.btn,
.grid .subMenu.navbar-toggler {
  padding: 0 !important;
  border: 0 !important;
  line-height: 0 !important;
}
.grid .subMenu button.btn {
  color: #ccc;
}
.grid .b-dropdown-form {
  padding: 0.25rem 30px;
}
</style>
