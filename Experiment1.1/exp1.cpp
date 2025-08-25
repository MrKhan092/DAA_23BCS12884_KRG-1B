#include <iostream>
using namespace std;

template <class T>
class Stack {
    T *arr;
    int top;
    int capacity;

public:
    Stack(int size) {
        capacity = size;
        arr = new T[capacity];
        top = -1;
    }

    void push(T element) {
        if (isFull()) {
            cout << "Stack is FULL\n";
            return;
        }
        arr[++top] = element;
        cout << element << " pushed\n";
    }

    void pop() {
        if (isEmpty()) {
            cout << "Stack is EMPTY\n";
            return;
        }
        cout << arr[top--] << " popped\n";
    }

    void peek() {
        if (isEmpty()) {
            cout << "Stack is EMPTY\n";
            return;
        }
        cout << "Top element: " << arr[top] << endl;
    }

    bool isEmpty() {
        return top == -1;
    }

    bool isFull() {
        return top == capacity - 1;
    }
};

int main() {
    Stack<int> s(5);

    s.push(10);
    s.push(20);
    s.push(30);

    s.peek();

    s.pop();
    s.peek();

    if (s.isEmpty())
        cout << "Stack is EMPTY\n";
    else
        cout << "Stack is NOT EMPTY\n";

    return 0;
}
