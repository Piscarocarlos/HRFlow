<?php

it('renders design pages', function () {
    $this->get(route('employees.index'))->assertOk();
    $this->get(route('employees.create'))->assertOk();
    $this->get(route('departments.index'))->assertOk();
    $this->get(route('departments.create'))->assertOk();
});
