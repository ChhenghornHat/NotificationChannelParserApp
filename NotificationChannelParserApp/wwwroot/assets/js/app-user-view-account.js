$(function(){var a=$(".datatable-project"),e=$(".datatable-invoice");a.length&&a.DataTable({ajax:assetsPath+"json/projects-list.json",columns:[{data:""},{data:"project_name"},{data:"total_task"},{data:"progress"},{data:"hours"}],columnDefs:[{className:"control",searchable:!1,responsivePriority:2,targets:0,render:function(a,e,t,s){return""}},{targets:1,responsivePriority:1,render:function(a,e,t,s){var n=t.project_name,i=t.framework,r=t.project_image;return'<div class="d-flex justify-content-left align-items-center"><div class="avatar-wrapper"><div class="avatar avatar-sm me-3">'+(r?'<img src="'+assetsPath+"img/icons/brands/"+r+'" alt="Project Image" class="rounded-circle">':'<span class="avatar-initial rounded-circle bg-label-'+["success","danger","warning","info","dark","primary","secondary"][Math.floor(6*Math.random())+1]+'">'+(r=(((r=(n=t.full_name).match(/\b\w/g)||[]).shift()||"")+(r.pop()||"")).toUpperCase())+"</span>")+'</div></div><div class="d-flex flex-column"><span class="text-truncate fw-medium text-heading">'+n+"</span><small>"+i+"</small></div></div>"}},{targets:2,render:function(a,e,t,s){return'<span class="text-heading">'+t.total_task+"</span>"}},{targets:-2,responsivePriority:3,render:function(a,e,t,s){var n,i,r=t.progress+"%";switch(!0){case t.progress<25:n="bg-danger",i="bg-label-danger";break;case t.progress<50:n="bg-warning",i="bg-label-warning";break;case t.progress<75:n="bg-info",i="bg-label-info";break;case t.progress<=100:n="bg-success",i="bg-label-success"}return'<div class="d-flex flex-column"><p class="mb-1 text-heading">'+r+'</p><div class="progress rounded '+i+' w-100 me-3" style="height: 6px;"><div class="progress-bar rounded '+n+'" style="width: '+r+'" aria-valuenow="'+r+'" aria-valuemin="0" aria-valuemax="100"></div></div></div>'}},{targets:-1,orderable:!1}],order:[[1,"desc"]],dom:'t<"d-flex justify-content-between mx-1 row"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',displayLength:7,lengthMenu:[7,10,25,50,75,100],language:{sLengthMenu:"Show _MENU_",searchPlaceholder:"Search Project"},responsive:{details:{display:$.fn.dataTable.Responsive.display.modal({header:function(a){return"Details of "+a.data().full_name}}),type:"column",renderer:function(a,e,t){t=$.map(t,function(a,e){return""!==a.title?'<tr data-dt-row="'+a.rowIndex+'" data-dt-column="'+a.columnIndex+'"><td>'+a.title+":</td> <td>"+a.data+"</td></tr>":""}).join("");return!!t&&$('<table class="table"/><tbody />').append(t)}}}}),e.length&&(e.DataTable({ajax:assetsPath+"json/invoice-list.json",columns:[{data:""},{data:"invoice_id"},{data:"invoice_status"},{data:"total"},{data:"issued_date"},{data:"action"}],columnDefs:[{className:"control",responsivePriority:2,targets:0,render:function(a,e,t,s){return""}},{targets:1,render:function(a,e,t,s){return'<a href="app-invoice-preview.html"><span>#'+t.invoice_id+"</span></a>"}},{targets:2,render:function(a,e,t,s){var n=t.invoice_status,i=t.due_date;return"<div class='d-inline-flex' data-bs-toggle='tooltip' data-bs-html='true' title='<span>"+n+'<br> <span class="fw-medium">Balance:</span> '+t.balance+'<br> <span class="fw-medium">Due Date:</span> '+i+"</span>'>"+{Sent:'<span class="avatar avatar-sm"> <span class="avatar-initial rounded-circle bg-label-secondary"><i class="mdi mdi-email-outline"></i></span></span>',Draft:'<span class="avatar avatar-sm"> <span class="avatar-initial rounded-circle bg-label-primary"><i class="mdi mdi-folder-outline"></i></span></span>',"Past Due":'<span class="avatar avatar-sm"> <span class="avatar-initial rounded-circle bg-label-danger"><i class="mdi mdi-alert-circle-outline"></i></span></span>',"Partial Payment":'<span class="avatar avatar-sm"> <span class="avatar-initial rounded-circle bg-label-success"><i class="mdi mdi-check"></i></span></span>',Paid:'<span class="avatar avatar-sm"> <span class="avatar-initial rounded-circle bg-label-warning"><i class="mdi mdi-chart-pie-outline"></i></span></span>',Downloaded:'<span class="avatar avatar-sm"> <span class="avatar-initial rounded-circle bg-label-info"><i class="mdi mdi-arrow-down"></i></span></span>'}[n]+"</div>"}},{targets:3,render:function(a,e,t,s){return"$"+t.total}},{targets:-1,title:"Actions",orderable:!1,render:function(a,e,t,s){return'<div class="d-flex align-items-center gap-3"><a href="javascript:;" class="btn btn-sm btn-icon btn-text-secondary rounded-pill text-body" data-bs-toggle="tooltip" title="Delete Invoice"><i class="mdi mdi-delete-outline mdi-24px mx-1"></i></a><a href="app-invoice-preview.html" class="btn btn-sm btn-icon btn-text-secondary rounded-pill text-body" data-bs-toggle="tooltip" title="Preview"><i class="mdi mdi-eye-outline mdi-24px mx-1"></i></a><button class="btn btn-sm btn-icon btn-text-secondary rounded-pill dropdown-toggle hide-arrow" data-bs-toggle="dropdown"><i class="mdi mdi-dots-vertical mdi-24px"></i></button><div class="dropdown-menu dropdown-menu-end m-0"><a href="javascript:;" class="dropdown-item"><i class="mdi mdi-download-outline me-2"></i><span>Download</span></a><a href="javascript:;" class="dropdown-item"><i class="mdi mdi-pencil-outline me-2"></i><span>Edit</span></a><a href="javascript:;" class="dropdown-item delete-record"><i class="mdi mdi-checkbox-multiple-blank-outline me-2"></i><span>Duplicate</span></a></div></div>'}}],order:[[1,"desc"]],dom:'<"card-header d-flex"<"head-label"><"dt-action-buttons text-end pt-0"B>>+t<"row mx-1"<"col-sm-12 col-md-6"i><"col-sm-12 col-md-6"p>>',displayLength:7,language:{sLengthMenu:"Show _MENU_",search:"",searchPlaceholder:"Search Invoice"},buttons:[{extend:"collection",className:"btn btn-primary dropdown-toggle float-end  mb-0",text:'<i class="mdi mdi-export-variant me-1"></i>Export',buttons:[{extend:"print",text:'<i class="mdi mdi-printer-outline me-1" ></i>Print',className:"dropdown-item",exportOptions:{columns:[1,2,3,4]}},{extend:"csv",text:'<i class="mdi mdi-file-document-outline me-1" ></i>Csv',className:"dropdown-item",exportOptions:{columns:[1,2,3,4]}},{extend:"excel",text:'<i class="mdi mdi-file-excel-outline me-1"></i>Excel',className:"dropdown-item",exportOptions:{columns:[1,2,3,4]}},{extend:"pdf",text:'<i class="mdi mdi-file-pdf-box me-1"></i>Pdf',className:"dropdown-item",exportOptions:{columns:[1,2,3,4]}},{extend:"copy",text:'<i class="mdi mdi-content-copy me-1" ></i>Copy',className:"dropdown-item",exportOptions:{columns:[1,2,3,4]}}]}],responsive:{details:{display:$.fn.dataTable.Responsive.display.modal({header:function(a){return"Details of "+a.data().full_name}}),type:"column",renderer:function(a,e,t){t=$.map(t,function(a,e){return""!==a.title?'<tr data-dt-row="'+a.rowIndex+'" data-dt-column="'+a.columnIndex+'"><td>'+a.title+":</td> <td>"+a.data+"</td></tr>":""}).join("");return!!t&&$('<table class="table"/><tbody />').append(t)}}}}),$("div.head-label").html('<h5 class="card-title mb-0">Invoice List</h5>')),e.on("draw.dt",function(){[].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]')).map(function(a){return new bootstrap.Tooltip(a,{boundary:document.body})})}),setTimeout(()=>{$(".dataTables_filter .form-control").removeClass("form-control-sm"),$(".dataTables_length .form-select").removeClass("form-select-sm")},300)});