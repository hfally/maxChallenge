const dateDiff = (dateold, datenew) => {
  let ynew = datenew.getFullYear();
  let mnew = datenew.getMonth();
  let dnew = datenew.getDate();
  let yold = dateold.getFullYear();
  let mold = dateold.getMonth();
  let dold = dateold.getDate();
  let diff = ynew - yold;
  
  if(mold > mnew) diff--;
  else
  {
    if(mold == mnew)
    {
      if(dold > dnew) diff--;
    }
  }
  return diff;
}

const getAges = input => {
    let newArr = [];
    let today = new Date;

    input.forEach(student => {
        let date = new Date(student.dob);
        age = dateDiff(date, today);

        newArr.push({
            name: student.name,
            regNo: parseInt(student.regNo),
            age: age
        });
    });

    newArr.sort(function (a, b) {
        return a.age - b.age;
    });

    return newArr;
}

const createGroup = (input, index = 0, groups = null, moved = 1) => {
    let students = getAges(input);
    let student = students[index]; 
    let start = index + 1;
    let lastIndex;

    let regNos = [];
    let oldest = 0;
    let sum = 0;
    let members = [];

    let group = [student];

    if (!groups) {
        groups = {};
    }

    for(i = start; i < students.length; i++) {
        let max = student.age + 5;
        lastIndex = i;

        if (max >= students[i].age && group.length < 3) {
            group.push(students[i]);
        } else {
            break;
        }
    }

    // Sort by regno
    group.sort(function (a, b) {
        return a.regNo - b.regNo;
    });

    // re-create group
    group.forEach(item => {
        let member = {
            name: item.name,
            age: item.age
        };

        members.push(Object.assign({}, member));

        regNos.push(item.regNo);

        sum += item.age;

        oldest = oldest < item.age ? item.age : oldest;
    });

    let label = {};

    label["group" + moved] = {
        members: members,
        oldest: oldest,
        sum: sum,
        regNos: regNos
    };

    // console.log(label, members);

    Object.assign(groups, label);

    if (lastIndex === (students.length - 1)) {
        return groups;
    }

    return createGroup(input, lastIndex, groups, (moved+1));
}

const groups = createGroup(input);

console.log(groups);