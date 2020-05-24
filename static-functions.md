# A static method cannot call a non-static method

Consider that you have objects a and b, both instances of Currency. currencyValidator exists on those two objects. Now store() belongs to the class Currency itself, not one of those objects. So, in Currency.store(), how does it know which object to call currencyValidator() on? The simple answer is it doesn't so it can't. This is one of the pitfalls of using static methods and one of the reasons people often urge against them.

Regardless, you can get around this by passing a into Currency.store(), and calling a.currencyValidator() instead.

It makes no sense to call a non-static function from a static one, in any language. Static (in this context) means that it's basically outside of the object, independent in all but name. It's not tied to any instance and thus there's no this or self to call non-static (ie member) fields.
