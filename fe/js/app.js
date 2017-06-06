(function (window) {
	'use strict';

	var count = 0;

	$('.new-todo').on('keypress', function (e) {
		if (e.which === 13 && $('.new-todo').val().trim() != "") {
			addTodo($('.new-todo').val());
			$('.new-todo').val("");
		}
	});

	$('.todo-list').on("click", ".toggle", function (event) {
		var id = $(event.target).parents('li').attr("id");
		var completed = $(event.target).parents('li').hasClass("completed") ? 0 : 1;
		updateCompleted(id, completed);
    });

    $('.todo-list').on("click", ".destroy", function (event) {
        var id = $(event.target).parents('li').attr("id");
        deleteTodo(id);
    });

    $(document).on("click", ".clear-completed", function (event) {
        deleteByCompleted();
    });

    $(document).on("click", ".filters > li", function (event) {
        var id = $(event.target).attr("id");
        $("#filter-all").removeClass("selected");
        $("#filter-active").removeClass("selected");
        $("#filter-completed").removeClass("selected");
        $("#" + id).addClass("selected");

        if(id == "filter-all") {
            $(".todo-list").find('li').css("display", "block");
		} else if (id == "filter-active") {
            $(".todo-list").find('li').css("display", "block");
            $(".todo-list").find('li.completed').css("display", "none");
		} else if (id == "filter-completed") {
            $(".todo-list").find('li').css("display", "none");
            $(".todo-list").find('li.completed').css("display", "block");
		}
    });

    function updateCount() {
    	$('.todo-count > strong').html(count);
	}

	function getAll() {
        $.ajax({
            url: '/api/todos',
            method: 'GET',
            success: function(response) {
            	for(var i=0; i<response.length; i++) {
            		prependTodo(response[i].id, response[i].todo, response[i].completed);
            		if (response[i].completed === 0) {
            			count++;
					}
				}
            	updateCount();
            }
        });
	}

	function getTodosByCompleted(completed) {
        $.ajax({
            url: '/api/todos',
            method: 'GET',
            success: function(response) {
                console.log(response);
                for(var i=0; i<response.length; i++) {
                    prependTodo(response[i].id, response[i].todo, response[i].completed);
                }
            }
        });
	}

	function prependTodo(id, todo, completed) {
		var completedClass = "";
		var isChecked = "";

		if (completed == 1) {
			completedClass = "completed";
			isChecked = "checked";
		}

    	var str = "<li id='" + id + "' class='" + completedClass + "'>" +
			"<div class='view'>" +
			"<input class='toggle' type='checkbox' " + isChecked + ">" +
			"<label>" + todo + "</label>" +
			"<button class='destroy'></button>" +
			"</div>" +
			"</li>";
		$(".todo-list").prepend(str);
	}

	function addTodo(todo) {
		$.ajax({
			url: '/api/todos',
			method: 'POST',
			contentType: 'application/json',
			dataType: 'json',
			data: JSON.stringify({
				todo: todo,
				completed: 0
			}),
			success: function(response) {
				prependTodo(response.id, response.todo, response.completed);
				count++;
				updateCount();
			}
		});
	}

	function updateCompleted(id, completed) {
		console.log(id);
		console.log(completed);
        $.ajax({
            url: '/api/todos/' + id,
            method: 'PUT',
            contentType: 'application/json',
            dataType: 'json',
            data: JSON.stringify({
                completed: completed
            }),
            success: function (response) {
            	if(completed == 1) {
                    $("#" + id).addClass("completed");
                    count--;
                } else {
                    $("#" + id).removeClass("completed");
                    count++;
				}
				updateCount();
            }
        });
	}

    function deleteTodo(id) {
        $.ajax({
            url: '/api/todos/' + id,
            method: 'DELETE',
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
            	if(!$("#" + id).hasClass("completed")) {
            		count--;
				}
                $("#" + id).remove();
                updateCount();
            }
        });
    }

    function deleteByCompleted() {
        $.ajax({
            url: '/api/todos/completed',
            method: 'DELETE',
            contentType: 'application/json',
            dataType: 'json',
            success: function (response) {
            	$('.todo-list').empty();
            	getAll();
            }
        });
    }

	getAll();
})(window);
