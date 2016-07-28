eventConfig = [
               {tagId:'addTask',event:'click',fn:addTaskFn},
               {tagId:'taskSearch',event:'click',fn:taskSearchFn},
               {tagId:'taskReset',event:'click',fn:taskResetFn},
               {tagId:'saveTask',event:'click',fn:saveTaskFn},
               {tagId:'updateTask',event:'click',fn:updateTaskFn},
               {tagId:'deleteTask',event:'click',fn:deleteTaskFn},
               {tagId:'cearTask',event:'click',fn:cearTaskFn},
               {tagId:'closeTaskDiv',event:'click',fn:closeTaskDivFn},
               {tagId:'viewTask',event:'click',fn:viewTaskFn}
    ];
var columns = [
   	{field:'dbid',title:'主键',checkbox:true,width:"5%"},
   	{field:'taskCode',title:'任务CODE',width:"30%",sortable:true},
	{field:'taskDesc',title:'任务描述',width:"30%",sortable:true},
	{field:'createUserName',title:'创建人',width:"20%",sortable:true},
	{field:'createTime',title:'创建时间',width:"15%",sortable:true,formatter:Common.DateFormatter}
];
var gridOptions = {
	url:ctx+"/task/getTaskPageData.action",
	columns:[columns],
	idField:"dbid",
	sortName:"createTime",
	rownumbers:false
}
jQuery(document).ready(function(){
	//绑定事件
	jQuery.bindEvent(eventConfig);
	//显示列表
	jQuery("#taskGrid").dataGrid(gridOptions);
	Common.formatDatebox("createTime");
	Common.formatDatebox("search_createTime");
});
/**
 * 添加人员
 */
function addTaskFn(){
	jQuery("#addTaskDiv").window('open');
	jQuery("#addTaskDiv").window('vcenter');
	disableForm("addTaskForm",false);
	$('#addTaskDiv').panel('setTitle',"添加任务");
	jQuery("#addTaskForm").attr("action","saveTask.action");
}
/**
 *保存
 */
function saveTaskFn(){
	jQuery("#addTaskForm").cbipForm();
}
/**
 * 更新人员
 */
function updateTaskFn(){
	var dbid = getSelectId("taskGrid",true,"dbid");
	if(dbid){
		$('#addTaskForm').form('load','getTaskById.action?dbid='+dbid);
		jQuery("#addTaskDiv").window('open');
	}
	disableForm("addTaskForm",false);
	$('#addTaskDiv').panel('setTitle',"修改任务");
	jQuery("#addTaskForm").attr("action","updateTask.action");
}
/**
 * 删除人员
 */
function deleteTaskFn(){
	var ids = getSelectId("taskGrid",false,"dbid");
	if(ids){
		$.messager.confirm('信息提示', '您确定要删除所选信息？', function(r){
			if (r){
				$.get("delTaskById.action",{dbids:ids},function(data){
					var data = eval('('+data+')');
					if(data.state){
						$.messager.alert('信息提示','删除成功!','info');
						jQuery('#taskGrid').datagrid('reload');
						jQuery('#taskGrid').datagrid('clearSelections');
					}
				});
			}
		});
	}
}
/**
 * 查看
 */
function viewTaskFn(){
	updateTaskFn();
	//禁用表单所有项
	disableForm("addTaskForm",true);
	$('#addTaskDiv').panel('setTitle',"查看任务");
}
//关闭弹出窗口
function closeTaskDivFn(){
	jQuery("#addTaskForm").form("clear");
	jQuery("#addTaskDiv").dialog('close');
}
//关闭弹出窗口并刷新列表
function backFn(data){
	jQuery("#addTaskForm").form("clear");
	jQuery("#addTaskDiv").dialog('close');
	jQuery('#taskGrid').datagrid('reload');
	jQuery('#taskGrid').datagrid('clearSelections');
}
//搜索
function taskSearchFn(){
	submitSearchForm("taskGrid","searchTaskForm");
}
//重置
function taskResetFn(){
	jQuery("#searchTaskForm").form("clear");
	$('#taskState').combobox('setValues', "");

}
//清空
function cearTaskFn(){
	jQuery("#addTaskForm").form("clear");
	$('#taskState',jQuery("#addTaskForm")).combobox('setValues', "");

}