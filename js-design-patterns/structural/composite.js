/**
 * 组合模式
 */

class Developer {
  constructor(name, salary) {
    this.name = name
    this.salary = salary
  }

  getName() {
    return this.name
  }

  setSalary(salary) {
    this.salary = salary
  }

  getSalary() {
    return this.salary
  }

  getRoles() {
    return this.roles
  }

  develop() {
    /* */
  }
}

class Designer {
  constructor(name, salary) {
    this.name = name
    this.salary = salary
  }

  getName() {
    return this.name
  }

  setSalary(salary) {
    this.salary = salary
  }

  getSalary() {
    return this.salary
  }

  getRoles() {
    return this.roles
  }

  design() {
    /* */
  }
}

class Organization {
  constructor() {
    this.employees = []
  }

  addEmployee(employee) {
    this.employees.push(employee)
  }

  getSalary() {
    let netSalary = 0

    this.employees.forEach(employee => {
      netSalary += employee.getSalary()
    })

    return netSalary
  }
}

const john = new Developer('John Doe', 12000)
const jane = new Designer('Jane', 10000)
const alin = new Developer('Alin', 20000)

const organization = new Organization()

const subOrganization = new Organization()
subOrganization.addEmployee(alin)

organization.addEmployee(john)
organization.addEmployee(jane)
organization.addEmployee(subOrganization)

console.log('Net salaries: ', organization.getSalary()) // Net Salaries: 42000
