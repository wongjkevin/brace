ace.define("ace/mode/pql_highlight_rules",["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"], function(acequire, exports, module) {
    "use strict";
    
    var oop = acequire("../lib/oop");
    var TextHighlightRules = acequire("./text_highlight_rules").TextHighlightRules;
    
    var PqlHighlightRules = function() {
    
        var keywords = (
            "select|from|where|and|or|" +
            "not|!|null|occurs|min|max|sum|average|forall|exists|let"
        );
    
        var builtinConstants = (
            "true|false|now|today|yesterday|last month|last year|last week" +
            "|second|seconds|minute|minutes|hour|hours|day|days|week|weeks|month|months|year|years|decade|decades|century|centuries|millennium|millennia"
        );
    
        var builtinFunctions = (
            "startsWith|doesNotStartWith|endsWith|doesNotEndWith|contains|doesNotContain|equals|notEqualTo|count|like|matches|in|notIn|intersects|intersection"
            + "|isNull|isNotNull|currentMonth|getMonth|currentYear|getYear|currentDayOfMonth|getDayOfMonth|date"
    
            // Following are cheating, as these should come from schema-based autocompletion.  Remove these once
            // schema-based autocompletion is working.
            + "|timestamp|person|name|firstName|middleName|lastName"
        );
    
        // var dataTypes = (
        //      "int|numeric|decimal|date|varchar|char|bigint|float|double|bit|binary|text|set|timestamp|" +
        //      "|number|integer"
        //  );
    
        // PQL is case sensitive
        var caseInsensitive = false;
    
        var keywordMapper = this.createKeywordMapper({
            "support.function": builtinFunctions,
            "keyword": keywords,
            "constant.language": builtinConstants
            // "storage.type": dataTypes
        }, "identifier", caseInsensitive);
    
        this.$rules = {
            "start" : [ 
            {
                token : keywordMapper,
                regex : "[a-zA-Z_$][a-zA-Z0-9_.$]*\\b"
            }, {
                token : "comment",
                regex : "//.*$"
            },  {
                token : "comment",
                start : "/\\*",
                end : "\\*/"
            }, {
                token : "string",           // " string
                regex : '".*?"'
            }, {
                token : "constant.numeric", // float
                regex : "[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b"
            }, {
                token : "keyword.operator",
                regex : "\\+|\\-|\\/|<|>|<=|=>|==|!=|="
            }, {
                token : "paren.lparen",
                regex : "[\\(]"
            }, {
                token : "paren.rparen",
                regex : "[\\)]"
            }, {
                token : "comma",
                regex : "[,]",
            }, {
                token : "text",
                regex : "\\s+"
            } ]
        };
        this.normalizeRules();
    };
    
    oop.inherits(PqlHighlightRules, TextHighlightRules);
    
    exports.PqlHighlightRules = PqlHighlightRules;
    });
    
    ace.define("ace/mode/pql",["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/pql_highlight_rules"], function(acequire, exports, module) {
    "use strict";
    
    var oop = acequire("../lib/oop");
    var TextMode = acequire("./text").Mode;
    var PqlHighlightRules = acequire("./pql_highlight_rules").PqlHighlightRules;
    
    var Mode = function() {
        this.HighlightRules = PqlHighlightRules;
        this.$behaviour = this.$defaultBehaviour;
    };
    oop.inherits(Mode, TextMode);
    
    (function() {
    
        this.lineCommentStart = "--";
    
        this.$id = "ace/mode/pql";
    }).call(Mode.prototype);
    
    exports.Mode = Mode;
    
    });