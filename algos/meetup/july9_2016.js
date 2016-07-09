// # 1.Given a string,  , of lowercase letters, determine the index of the character whose removal will make  a palindrome. If  is already a palindrome or no such character exists, then print . There will always be a valid solution, and any correct answer is acceptable. For example, if  "bcbc", we can either remove 'b' at index  or'c' at index .

// # aaab
// # baa
// # aaa
// # Sample Output

// # 3
// # 0
// # true

function checkPali(str) {
  for (var i = 0; i < str.length / 2; i++) {
    if (str[i] !== str[str.length - 1 - i]) {
      return false;
    }
  }
  return true
}

function removePali(str) {
  var checkInner = false, index;
  for (var i = 0; i < str.length / 2; i++) {

    if (str[i] !== str[str.length - 1 - i]) {
      if (checkInner === true) {
        return false;
      } else {
        checkInner = true;
        index = str.length - 1 - i;
        var left = checkPali(str.slice(i, str.length - i - 1));
        if (left === false) {
          index = i;
          var right = checkPali(str.slice(i + 1, str.length - i));
          if (right === false) {
            return false
          }
        }
        return index;
      }

    }

  }
  return true;
}

console.log(removePali('aadbbaa'));

// # 2.Alice has a binary string, , of length . She thinks a binary string is beautiful if and only if it doesn't contain thesubstring .
// #
// # In one step, Alice can change a  to a  (or vice-versa). Count and print the minimum number of steps needed to make Alice see the string as beautiful.
// #
// # Input Format
// #
// # The first line contains an integer,  (the length of binary string ).
// # The second line contains a single binary string, , of length .
// #
// # Constraints
// #
// # Each character in .
// # Output Format
// #
// # Print the minimum number of steps needed to make the string beautiful.
// #
// # Sample Input 0
// #
// # 7
// # 0101010
// # Sample Output 0
// #
// # 2
// # Sample Input 1
// #
// # 5
// # 01100
// # Sample Output 1
// #
// # 0
// # Sample Input 2
// #
// # 10
// # 0100101010
// # Sample Output 2
// #
// # 3
// # Explanation
// #
// # Sample Case 0:
// #
// # In this sample,
// #
// # The figure below shows a way to get rid of each instance of :
// #
// #
// # Because we were able to make the string beautiful by changing  characters ( and ), we print .
// #
// # Sample Case 1:
// #
// # In this sample
// #
// # The substring  does not occur in , so the string is already beautiful and we print .


// # In the above example, for nodes 5 and 5, the lowest common ancestor is 1. And for nodes 6 and 2, the ancestor is 0. The question has been asked by both Google and Microsoft recently.
// #
// # 4.Write a C program to Delete a Tree. 5.Given a linked list, reverse alternate nodes and append at the end
// # Given a linked list, reverse alternate nodes and append them to end of list. Extra allowed space is O(1)
// # Examples
// #
// # Input List:  1->2->3->4->5->6
// # Output List: 1->3->5->6->4->2
// #
// # Input List:  12->14->16->18->20
// # Output List: 12->16->20->18->14
