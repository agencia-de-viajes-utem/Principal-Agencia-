package main

import "testing"
//fsdfsdf
func TestSumar(t *testing.T) {
    resultado := Sumar(2, 3)
    if resultado != 5 {
        t.Errorf("Sumar(2, 3) = %d; se esperaba 5", resultado)
    }
}
